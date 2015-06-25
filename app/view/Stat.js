Ext.define('MyApp.view.Stat',{
	extend: 'Ext.window.Window',
	autoShow: true,
	//requires: ['MyApp.controller.Stat'],

	title: 'Статистика',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	resizable: false,
	width: 600,
	items:
	[
		{
			xtype: 'grid',
			maxHeight: 200,
			title: 'Количество посещений',
			columns: [
				{header: 'Дата', dataIndex: 'date', flex: 2, summaryRenderer: function(){return "<b>Итого</b>";}},
				{header: 'количество', dataIndex: 'amount', flex: 1, summaryType: 'sum', summaryRenderer: function(v){return "<b>"+v+"</b>";}}
			],
			store: 
			{
				autoLoad: true,
				fields: [{name:'date', type: 'string'}, {name:'amount', type: 'int'}],
				proxy:
				{
					type: 'ajax',
					url: 'statistic.php',
					reader:{
						type: 'json',
						rootProperty: 'visitors',
						successProperty: 'success'
					}
				}
			},
			features:
			[
				{ftype: 'summary'}
			]
		},
		{
			xtype: 'grid',
			maxHeight: 200,
			title: 'Количество лицевых, которые ввели показания',
			columns: [
				{header: 'Дата', dataIndex: 'date', flex: 2, summaryRenderer: function(){return "<b>Итого</b>";}},
				{header: 'количество', dataIndex: 'amount', flex: 1, summaryType: 'sum', summaryRenderer: function(v){return "<b>"+v+"</b>";}}
			],
			store: 
			{
				autoLoad: true,
				fields: [{name:'date', type: 'string'}, {name:'amount', type: 'int'}],
				proxy:
				{
					type: 'ajax',
					url: 'statistic.php',
					reader:{
						type: 'json',
						rootProperty: 'updates',
						successProperty: 'success'
					}
				}
			},
			features:
			[
				{ftype: 'summary'}
			]
		}
	]
});