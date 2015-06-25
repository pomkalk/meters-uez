Ext.define('MyApp.controller.MainController',{
	extend: 'Ext.app.Controller',
	views:['MyApp.view.MainPanel', 'MyApp.view.FindForm'],
	//models:['MyApp.model.StreetsModel'],
	//stores:['MyApp.store.StreetsStore'],
	init: function()
	{
		Ext.Ajax.request({
			url: 'getaccess.php',
			method:'POST',
			success: function(resp)
			{
				var j = Ext.decode(resp.responseText);
				
				if (j.success)
				{
					var findPanel = Ext.getCmp('mainPanelId');
					findPanel.add({xtype: 'find-form'});
					var streetsCombo = Ext.getCmp('streetId');
					streetsCombo.setLoading(true);

					Ext.Ajax.request({
						url: 'data.php',
						method: "POST",
						params:{
							action:0
						},
						success: function(data_resp)
						{
							var js = Ext.decode(data_resp.responseText);
							if (js.success)
							{
								var streetsStore = Ext.create('MyApp.store.StreetsStore');
								streetsStore.loadData(js.data);
								streetsCombo.store = streetsStore;
								streetsCombo.setLoading(false);	
							}else{
								Ext.MessageBox.show({
								title: 'Ошибка',
								msg: 'Ошибка загрузки данных',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.ERROR
							});
							}
							
						},
						failure: function(resp, opts)
						{
							Ext.MessageBox.show({
								title: 'Ошибка',
								msg: 'Произошла ошибка, попробуйте позже.',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.ERROR
							});
						}
					});

				}else{
				Ext.MessageBox.show({
					title: 'Внимание',
					msg: j.message,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.INFO
				});
				}
			},
			failure: function(resp, opts)
			{
				Ext.MessageBox.show({
					title: 'Ошибка',
					msg: 'Произошла ошибка, попробуйте позже.',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.ERROR
				});
			}
		});


		this.control({
			'#findButton':{
				click:this.findMeters
			},
			'#streetId':
			{
				change:function(cb,v,o)
				{
					var buildingCombo = Ext.getCmp('buildingId');
					buildingCombo.setDisabled(false);
					buildingCombo.setLoading(true);
					buildingCombo.clearValue();
					console.log(cb.getValue());

					Ext.Ajax.request({
						url: 'data.php',
						method: "POST",
						params:{
							action:1,
							idStreet: cb.getValue()
						},
						success: function(data_resp)
						{
							var js = Ext.decode(data_resp.responseText);

							if (js.success)
							{
								var buildingsStore = Ext.create('MyApp.store.BuildingsStore');
								buildingsStore.loadData(js.data);
								buildingCombo.bindStore(buildingsStore);

								buildingCombo.setLoading(false);	
							}else{
								buildingCombo.setLoading(false);
								buildingCombo.setDisabled(true);
								Ext.MessageBox.show({
									title: 'Ошибка',
									msg: 'Ошибка при загрузки домов.',
									buttons: Ext.MessageBox.OK,
									icon: Ext.MessageBox.ERROR
								});
							}
							
						},
						failure: function(resp, opts)
						{
							building.setLoading(false);
							building.setDisabled(true);
							Ext.MessageBox.show({
								title: 'Ошибка',
								msg: 'К сожалению данная улица не найдена.',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.ERROR
							});
						}
					});


				}
			},


			'#buildingId':
			{
				change:function(cb,v,o)
				{
					var appCombo = Ext.getCmp('appartmentId');
					appCombo.setDisabled(false);
					appCombo.setLoading(true);
					appCombo.clearValue();

					Ext.Ajax.request({
						url: 'data.php',
						method: "POST",
						params:{
							action:2,
							idBuilding: cb.getValue()
						},
						success: function(data_resp)
						{
							var js = Ext.decode(data_resp.responseText);

							if (js.success)
							{                              
								var appStore = Ext.create('MyApp.store.AppStore');
								appStore.loadData(js.data);
								appCombo.bindStore(appStore);

								appCombo.setLoading(false);	
							}else{
								appCombo.setLoading(false);
								appCombo.setDisabled(true);
								Ext.MessageBox.show({
									title: 'Ошибка',
									msg: 'Ошибка при загрузки домов.',
									buttons: Ext.MessageBox.OK,
									icon: Ext.MessageBox.ERROR
								});
							}
							
						},
						failure: function(resp, opts)
						{
							appCombo.setLoading(false);
							appCombo.setDisabled(true);
							Ext.MessageBox.show({
								title: 'Ошибка',
								msg: 'К сожалению данная улица не найдена.',
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.ERROR
							});
						}
					});


				}
			}
		});
	},

	findMeters: function()
	{
		//alert("Find meters button clicked!");
	}

});