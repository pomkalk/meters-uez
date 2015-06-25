Ext.define('MyApp.store.AppStore',{
	extend: 'Ext.data.Store',
	autoDestroy: true,
	model: 'MyApp.model.AppModel'
});