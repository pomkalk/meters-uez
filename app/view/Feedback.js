Ext.define('MyApp.view.Feedback',{
	extend: 'Ext.window.Window',
	autoShow: true,
	title: 'Просмотр отзывов',
	width: 800,
	height: 600,
	resizable: false,
	layout: 'fit',
	items:[
		{
			xtype:'grid',
			id: 'feedbackId',
			columns: [
				{header: 'Адрес', dataIndex: 'address', flex: 3 },
				{header: 'Дата', dataIndex: 'date', flex: 1, xtype: 'datecolumn', format:'d.m.Y'},
				{header: 'Отзыв', dataIndex: 'feedback', flex: 5}
			],
			store: 
			{
				autoLoad: true,
				fields: [{name:'address', type: 'string'},{name:'date', type: 'date'},{name:'feedback', type: 'string'}],
				proxy:
				{
					type: 'ajax',
					url: 'getfeedback.php',
					reader:{
						type: 'json',
						rootProperty: 'data',
						successProperty: 'success'
					}
				}
			},
		}
	]

});