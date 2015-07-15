Ext.define('MyApp.controller.MainController',{
	extend: 'Ext.app.Controller',
	views:['MyApp.view.MainPanel', 'MyApp.view.FindForm'],
	//models:['MyApp.model.StreetsModel'],
	//stores:['MyApp.store.StreetsStore'],


	routes: {
		'stat' : function(){
			var stat = Ext.create('MyApp.view.Stat');
		}
	},

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
					findPanel.add({xtype: 'find-form', bbar:[
							{
								xtype: 'label',
								html: j.message,
								height: 200
							}
						]});
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

					Ext.Ajax.request({
						url: 'captcha/captcha.php',
						method: 'GET',
						success: function(data_resp)
						{
							Ext.get('cap').dom.src = data_resp.responseText;
						},
						failure: function(resp, opts)
						{
							Ext.MessageBox.show({
								title: 'Ошибка',
								msg: 'Произошла ошибка при загрузки каптчи.',
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
				select:function(cb,v,o)
				{
					var buildingCombo = Ext.getCmp('buildingId');

					buildingCombo.setDisabled(false);
					buildingCombo.setLoading(true);
					buildingCombo.clearValue();
					//console.log(cb.getValue());

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

								Ext.getCmp('appartmentId').setDisabled(true);
								Ext.getCmp('lsId').setDisabled(true);
								Ext.getCmp('space').setDisabled(true);
								Ext.getCmp('lsId').setValue('');
								Ext.getCmp('space').setValue('');

								buildingCombo.setLoading(false);
								buildingCombo.focus();	
							}else{
								buildingCombo.setLoading(false);
								buildingCombo.setDisabled(true);
								Ext.getCmp('lsId').setDisabled(true);
								Ext.getCmp('space').setDisabled(true);
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
				select:function(cb,v,o)
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
								appCombo.focus();
								Ext.getCmp('lsId').setDisabled(true);
								Ext.getCmp('space').setDisabled(true);
								Ext.getCmp('lsId').setValue('');
								Ext.getCmp('space').setValue('');
							}else{
								appCombo.setLoading(false);
								appCombo.setDisabled(true);
								Ext.getCmp('lsId').setDisabled(true);
								Ext.getCmp('space').setDisabled(true);
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
			},
			'#appartmentId':
			{
				select:function(cb,v,o)
				{
					Ext.getCmp('lsId').setDisabled(false);
					Ext.getCmp('lsId').focus();
					Ext.getCmp('space').setDisabled(false);
				}
			},
			'#updateButton':
			{
				click: this.updateCaptcha
			},
			'#closeMetersList':
			{
				click: function(button)
				{
					button.up('window').close();
					
				}
			},
			'#metersListHelp':
			{
				click: function()
				{
					Ext.MessageBox.show({
						title: 'Справка',
						msg: 'Для того, что бы ввести новые показания индивидуальных приборов учета, необходимо мышкой выбрать строку со счетчиком в графе «Новые показания».  Новое показание индивидуального прибора учета не может быть меньше предыдущего. В случае если показания по счетчику не менялись, необходимо указать такое же показание как и в предыдущем месяце. Если Вы не хотите передавать показания по определенному индивидуальному прибору учета, необходимо оставить значение «0». Показания по счетчику «Электроэнергия» должны быть целым числом.',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.INFO
					});
				}
			},
			'#findFormHelp':
			{
				click: function()
				{
					Ext.MessageBox.show({
						title: 'Справка',
						msg: 'Необходимо заполнить все предоставленные поля. Вся необходимая информация находится в Вашем счете на оплату жилищно-коммунальных услуг. В целях безопасности и исключения ситуаций подмены показаний, используется проверочный показатель в виде «Площади помещения», так как данная информация находится в запечатанном счете на оплату жилищно-коммунальных услуг. Указывать площадь необходимо в соответствии с данными в Вашем счете на оплату жилищно-коммунальных услуг. ',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.INFO
					});
				}
			},
			'#saveMetersList':
			{
				click: function(button)
				{
					var wind = button.up('window');
					var f = Ext.getCmp('metersGrid');
					
					var recs = f.getStore().getModifiedRecords();

					var upd = [];
					for (i=0;i<recs.length;i++)
					{
						if (recs[i].dirty)
						{
							upd.push(recs[i].data);
						}
					}
					if (upd.length>0)
					{

						var ok = true;
						var mess = "";
						var info_mess = ""
						for (i=0;i<upd.length;i++)
						{
							if (isNaN(upd[i].currentValue))
							{
								ok = false;
								mess = 'Укажите положительные числовые значения, либо укажите ноль.';
							}
							if(upd[i].currentValue<0)
							{
								ok = false;
								mess = 'Укажите положительные числовые значения, либо укажите ноль.';
							}else if (upd[i].currentValue != 0)
									if (upd[i].currentValue < upd[i].lastValue)
									{
										ok = false;
										mess = "Новое показание не может быть меньше предыдущего, либо укажите '0' еслы Вы не хотите передавть данные показания";
									}else{

										if (upd[i].service == 'Электроэнергия')
										{
											if (this.typeOf(upd[i].currentValue) != 'int')
											{
												ok = false;
												mess = "Показания по счетчику «Электроэнергия» должны быть целым числом.";
											}
										}

//Раздел проверки по нормативу и датам

										ld = new Date(upd[i].lastValueDate);
										cd = new Date();
										mp = (cd.getYear()*12+cd.getMonth()) - (ld.getYear()*12+ld.getMonth());
										if (mp<=0) 
										{
											mp = 1;
										}
//Блок указания нормативов для проверки
										cold_mp = 5.01*mp;
										warm_mp = 3.37*mp;
//
										console.log('Холодная норматив:'+cold_mp+' за '+mp);
										console.log('Горячая норматив:'+warm_mp+' за '+mp);

										if (upd[i].service == 'Холодная вода')
										{
											if ((upd[i].currentValue - upd[i].lastValue) > cold_mp)
											{
												info_mess += "Пожалуйста проверьте введенные показания по счетчику «Холодная вода», так как введенные Вами показания составляют "+(upd[i].currentValue - upd[i].lastValue)+" кубов, что может являться ошибкой. Возможно вы не поставили знак отделения десятичной части, пожалуйста сверьте с предыдущими показаниями.<br /><br />";
											}
										}
										if (upd[i].service == 'Горячая вода')
										{
											if ((upd[i].currentValue - upd[i].lastValue) > warm_mp)
											{
												info_mess += "Пожалуйста проверьте введенные показания по счетчику «Горячая вода», так как введенные Вами показания составляют "+(upd[i].currentValue - upd[i].lastValue)+" кубов, что может являться ошибкой. Возможно вы не поставили знак отделения десятичной части, пожалуйста сверьте с предыдущими показаниями.<br /><br />";
											}
										}


									}


						}


						if (ok)
						{
							var parent = this;
							Ext.MessageBox.confirm('Сохранить',info_mess+'Вы действительно хотите сохранить новые показания?',function(r){
								if (r=='yes')
								{
									wind.setLoading(true);
									parent.updateMetersInformation(parent, wind, upd, 0);
								}
							});	
						}else{
							Ext.MessageBox.show({
								title: 'Внимание',
								msg: mess,
								buttons: Ext.MessageBox.OK,
								icon: Ext.MessageBox.WARNING
							});	
						}
						
					}else{
						Ext.MessageBox.show({
							title: 'Внимание',
							msg: 'Необходимо ввести показания счетчиков в графу "Новые показания"',
							buttons: Ext.MessageBox.OK,
							icon: Ext.MessageBox.INFO
						});
					}
				}
			}
		});
	},
	typeOf: function(input)
	{
    var m = (/[\d]+(\.[\d]+)?/).exec(input);
    	if (m) {
       		// Check if there is a decimal place
       		if (m[1]) { return 'float'; }
       		else { return 'int'; }          
    	}
    	return 'string';
	},
	updateMetersInformation: function(cl, wind, upd, i)
	{
		if (i<upd.length)
		{
			Ext.Ajax.request({
				url: 'save.php',
				method: 'POST',
				params: upd[i],
				success: function(resp_data)
				{
					console.log(resp_data.responseText);
					var js = Ext.decode(resp_data.responseText);

					if (js.success)
					{
						cl.updateMetersInformation(cl, wind,upd,++i);
					}else{
						Ext.MessageBox.show({
							title: 'Ошибка',
							msg: 'Произошла ошибка при сохранении cчетчика "'+upd[i].service+'". '+js.message,
							buttons: Ext.MessageBox.OK,
							icon: Ext.MessageBox.ERROR
						});
						wind.close();
					}

				},
				failure: function(resp,opts)
				{
					Ext.MessageBox.show({
						title: 'Ошибка',
						msg: 'Произошла ошибка при сохранении данных, попробуйте еще раз.',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.ERROR
					});
					wind.close();
				}
			});
		}else{
					Ext.MessageBox.show({
						title: 'Данные сохранены',
						msg: 'Данные успешно сохранены.',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.INFO
					});
					wind.close();	
		}
	},

	findMeters: function()
	{
		var f = Ext.getCmp('findFormId');
		if (f.isValid())
		{
			f.setLoading(true);
			var fun = this;
			Ext.Ajax.request({
				url:'open.php',
				method: 'POST',
				params: f.getValues(),
				success: function(data_resp)
				{
					var js = Ext.decode(data_resp.responseText);
					if (js.success)
					{
						var mstore = Ext.create('MyApp.store.MetersStore');
						mstore.loadData(js.data);

						var win = Ext.create('MyApp.view.MetersList',{title: js.address});

						var grid = Ext.getCmp('metersGrid');
						grid.bindStore(mstore);

						win.show();

						fun.updateCaptcha();
						f.setLoading(false);
					}else{
						Ext.MessageBox.show({
							title: 'Ошибка',
							msg: js.message,
							buttons: Ext.MessageBox.OK,
							icon: Ext.MessageBox.ERROR
						});		
						fun.updateCaptcha();
						f.setLoading(false);
					}
				},
				failure: function(resp, opts)
				{
					Ext.MessageBox.show({
						title: 'Ошибка',
						msg: 'Произошла ошибка, попробуйте позже',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.ERROR
					});
					fun.updateCaptcha();
					f.setLoading(false);
				}
			});
			
			

		}else{
			Ext.MessageBox.show({
				title: 'Внимание',
				msg: 'Заполните все поля!',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});			
		}
		

	},

	updateCaptcha: function()
	{
		Ext.Ajax.request({
			url: 'captcha/captcha.php',
			method: 'GET',
			success: function(data_resp)
			{
				Ext.get('cap').dom.src = data_resp.responseText;
			},
			failure: function(resp, opts)
			{
				Ext.MessageBox.show({
					title: 'Ошибка',
					msg: 'Произошла ошибка при загрузки каптчи.',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.ERROR
				});
			}
		});
	}
});