Ext.define("FD4.store.Country", {
    extend: "Ext.data.Store",
    requires: ["Ext.data.proxy.OData",
			   "FD4.api.Error"
	],
    config: {
		model: "FD4.model.Country", 
		storeId: 'countrystore',   
		fields: [

			{ name: "CountryCode"},
			{ name: "CountryText"},

		],

		autoLoad: true
	}
});
