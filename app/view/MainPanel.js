Ext.define("FD4.view.MainPanel", {
	extend: "Ext.tab.Panel",
	xtype: "mainpanel",

	config: {
		tabBarPosition: "bottom",
		items: [ 
			{xtype: "countrycontainer"} , 
		]
	}
});
