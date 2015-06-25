Ext.define('MyApp.view.FindForm',{
	extend: 'Ext.form.Panel',
	xtype: 'find-form',
	id: 'findFormId',
	title: 'Заполните форму',
	padding: 12,
	tools:[
		{
			type: 'help',
			id: 'findFormHelp'
		}
	],
	fbar: [{
		xtype: 'button',
		text:'Найти',
		id: 'findButton',
	},{
		xtype:'button',
		text: 'Обновить картинку',
		id: 'updateButton'
	}],
	items:
	[
		{
			xtype: 'combo',
			id: 'streetId',
			name: 'streetId',
			emptyText: 'Укажите улицу',
			padding: 10,
			labelWidth: 150,
			fieldLabel: 'Улица',
			displayField: 'street',
			valueField: 'idStreet',
			queryMode: 'local',
			//editable:false,
			allowBlank: false
		},
		{
			xtype: 'combo',
			id: 'buildingId',
			name:'buildingId',
			emptyText: 'Укажите номер дома',
			padding: 10,
			labelWidth: 150,
			fieldLabel: 'Дом',
			displayField: 'buildingNumber',
			valueField: 'idBuilding',
			queryMode:'local',
			disabled: true,
			//editable: false,
			allowBlank: false
		},
		{
			xtype: 'combo',
			id: 'appartmentId',
			name: 'appartmentId',
			emptyText: 'Укажите квартиру',
			padding: 10,
			labelWidth: 150,
			fieldLabel: 'Квартира',
			displayField: 'kv',
			valueField: 'idLs',
			queryMode: 'local',
			disabled: true,
			//editable: false,
			allowBlank: false
		},
		{
			xtype: 'textfield',
			id: 'lsId',
			name: 'lsId',
			emptyText: 'Укажите лицевой счет',
			padding: 10,
			labelWidth: 150,
			fieldLabel: 'Лицевой счет',
			disabled: true,
			allowBlank: false
		},
		{
			xtype: 'textfield',
			id: 'space',
			name:'space',
			emptyText: 'Укажите площадь',
			padding: 10,
			labelWidth: 150,
			fieldLabel: 'Площадь помещения',
			disabled: true,
			allowBlank: false
		},
		{
			xtype: 'panel',
			height: 75,
			layout: 'fit',
			html: '<center><img id="cap" src="" alt="capthca" /></center>'
		},
		{
			xtype: 'textfield',
			id: 'captcha',
			name:'captcha',
			emptyText: 'Введите текст с картинки',
			padding: 10,
			labelWidth: 150,
			fieldLabel: 'Укажите текст с картинки',
			allowBlank: false
		}

	]
});