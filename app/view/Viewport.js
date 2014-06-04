Ext.define("FD4.view.Viewport",{
	extend: "Ext.Panel",

	initialize: function() {},

	config: {
		fullscreen: true,
		layout: "card",
		items: [ 
			{xtype: "mainpanel" }, 
			{xtype: "countrycontainer"},
			{xtype: "countryeditor"},


		]
	}
});
