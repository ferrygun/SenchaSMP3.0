Ext.define("FD4.view.CountryContainer",{
	extend: "Ext.Panel",
	xtype: "countrycontainer",

	requires: ["FD4.view.Country"],

	initialize: function() {
		var toolbar = {
			xtype: "toolbar",
			docked: "top",
			title : 'Country',
		};

		this.add([toolbar, { xtype: "country"}, ]);
	},

	config: {
		layout: "fit", 
		title: "Country",
		iconCls: "list"
	},

	
});
