Ext.define('MyApp.view.NewsForm',{
	extend: 'Ext.window.Window',
	modal: true,
	title: 'Новости с официального сайта ООО "УЕЗ ЖКУ г. Ленинска-Кузнцкого"',
	resizable: false,
	draggable: false,
	width: Ext.getBody().getViewSize().width,
	height: Ext.getBody().getViewSize().height
});