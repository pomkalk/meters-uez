Ext.define('MyApp.model.MetersModel',{
	extend: 'Ext.data.Model',
	fields:
	[
		{name: 'ls', type: 'int'},
		{name: 'meter', type: 'int'},
		{name: 'service', type: 'string'},
		{name: 'lastValueDate', type: 'date'},
		{name: 'lastValue', type: 'float'},
		{name: 'currentValueDate', type: 'date'},
		{name: 'currentValue', type: 'float'}
	]
});