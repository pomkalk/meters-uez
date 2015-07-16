Ext.define('MyApp.view.FeedbackForm',{
	extend: 'Ext.window.Window',
	modal: true,
	sizable: false,
	title: 'Оставить отзыв',
	width: 640,
	height: 480,
	fbar:
	[
		{
			xtype: 'button',
			text: 'Оставить отзыв',
			id: 'sendFeedback'
		},
		{
			xtype: 'button',
			text: 'Закрыть',
			id: 'feedbackCloseButton',
			scope: this
		}
	],
	layout: 'fit',
	items:
	[
		{
			xtype: 'textarea',
			id: 'feedbackEditor'
		}
	]
})