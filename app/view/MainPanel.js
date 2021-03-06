Ext.define('MyApp.view.MainPanel',{
	extend: 'Ext.panel.Panel',
	title: 'Ввод показаний индивидуальных приборов учета ООО "УЕЗ ЖКУ г. Ленинска-Кузнецкого"',
	id: 'mainPanelId',
	xtype: 'main-panel',
	tbar:[
		{
			xtype:'button',
			text:'Вернуться на сайт',
			id: 'goBackButton',
			handler: function(){
				window.location = 'http://uez-lk.ru'
			}
		}/*,
		{
			xtype:'button',
			text: 'Новости',
			id: 'newsButton'
		}*/
	],
	layout:
	{
		type:'hbox',
		pack: 'center'
	},
	fbar:
	[
		'ООО «УЕЗ ЖКУ г. Ленинска-Кузнецкого» 2015 &copy;',
		'->',
		'Разработчик: Pomka inc. (email: <a href="mailto:pomkalk@gmail.com">pomkalk@gmail.com</a>)'
	]
});