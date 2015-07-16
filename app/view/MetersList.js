Ext.define('MyApp.view.MetersList',{
	extend: 'Ext.window.Window',
	modal: true,
	width: 700,
	tools:[
		{
			type: 'help',
			id: 'metersListHelp'
		}
	],
	buttons:[
		{
			xtype:'button',
			text: 'Отзывы и пожелания',
			id: 'openFeedbackWindow'
		},
		'->',
		{
			xtype:'button',
			id: 'saveMetersList',
			text: 'Сохранить'
		},{
			xtype:'button',
			id: 'closeMetersList',
			text: 'Закрыть',
			scope: this
		}
	],
	items:
	[
		{
			xtype: 'grid',
			id: 'metersGrid',
			columns:
			[
				{header: 'Тип счетчика', dataIndex: 'service', flex: 3},
				{header: 'Дата последних показаний', dataIndex: 'lastValueDate', flex: 3, xtype: 'datecolumn', format:'d.m.Y'},
				{header: 'Последние показания', dataIndex: 'lastValue', flex: 2},
				{header: 'Новые показания', vtype: 'int', dataIndex: 'currentValue', flex:2, editor: 'textfield'}
			],
			plugins:[
				Ext.create('Ext.grid.plugin.CellEditing',{
					clicksToEdit: 1
				})
			]

		}
	]
});