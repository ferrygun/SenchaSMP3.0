Ext.define("FD4.controller.Note",{
	extend: "Ext.app.Controller",
    requires: ["Ext.data.proxy.OData",
			   "FD4.api.Error",
	],

	
	config: {

		refs: {
			mainPanel : "mainpanel",

			country: "country",
			countryEditor: "countryeditor",
		},

		control: {
			
			country: {
				SearchCountryCommand: "onSearchCountryCommand",
			},
			countryEditor: {
				backCommand: "onBackButton",
			},
		}
	},

	init: function () {
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
            message: 'Loading...'
        });

		Ext.Ajax.request({
			url: "http://192.168.0.14/sapgw/com.FD.Demo/",
			headers: {
				"Content-Type" : "application/atom+xml; charset=UTF-8", 
				"Authorization" : 'Basic UDE5NDA1MTcxMTY6UGFwYW1hbWExOA=='
			},
			method: 'GET',
			withCredentials: true,
			useDefaultXhrHeader: false,
			disableCaching: false,
			success: function(response, opts){
				console.log('GET Success'); 
				Ext.Viewport.setMasked(false); 
			},

			failure : function(response, opts) { 
				console.log(response.statusText); 
				if(response.statusText == 'Not Found' || response.statusText == 'Forbidden' ) {

					if(Ext.os.is.iPad) {
						devtype = 'iPad'
					} else if(Ext.os.is.iPhone) {
						devtype = 'iPhone'
					} else if(Ext.os.is.iPod) {
						devtype = 'iPod'
					} else if(Ext.os.is.iOS) {
						devtype = 'iOS'
					} else if(Ext.os.is.MacOS) {
						devtype = 'iOS'
					} else if(Ext.os.is.Android) {
						devtype = 'Android'
					} else if(Ext.os.is.BlackBerry) {
						devtype = 'BlackBerry'
					} else if(Ext.os.is.Windows) {
						devtype = 'Windows'
					} else if(Ext.os.is.Other) {
						devtype = 'Unknown'
					}

					//alert(devtype);
					var regXML = '<?xml version="1.0" encoding="utf-8"?>' +
					          '<entry xmlns="http://www.w3.org/2005/Atom" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices">' +
							  '<content type="application/xml">' +
					          '<m:properties>' +
					          '<d:DeviceType>' + devtype + '</d:DeviceType>' + 
				              '</m:properties>' +
							  '</content>' +
							  '</entry>' 

					Ext.Ajax.request({
						url: 'http://192.168.0.14/sapgw/odata/applications/latest/com.FD.Demo/Connections',
						headers: {
							"Content-Type" : "application/atom+xml; charset=UTF-8", 
							"Authorization" : 'Basic UDE5NDA1MTcxMTY6UGFwYW1hbWExOA=='
						},
						method: 'POST',
						
						withCredentials: true,
						useDefaultXhrHeader: false,
						xmlData: regXML,
						disableCaching: false,
						success: function(response, opts){
							console.log("HTTP POST"); 
							Ext.Viewport.setMasked(false); 
						},
						failure : function(response, opts) { 
							console.log("POST Failure"); 
							console.log(response);
							Ext.Viewport.setMasked(false); 
						},
					}); 
				}

			},
		}); 

		
    },


	onSearchCountryCommand: function(record, button) {
		var formObj = button.up('country');
		var formData = formObj.getValues();
		
		if (formData.CountryCode == "") {
			Ext.Viewport.setMasked(false); 
			Ext.Msg.alert('Error', 'Country cannot be empty');
		} else {
			
		

			var stores = Ext.create('FD4.store.Country', {
					proxy: {
						type: 'odata', 
						enablePagingParams: false,
						withCredentials: true,	
						username: 'P1940517092',
						password: 'Password',
						url: "http://192.168.0.14/sapgw/com.FD.Demo/CountryCollection('" + formData.CountryCode + "')",
						listeners: {
							'exception': function (proxy, response, operation) {
								FD4.api.Error.alert(response);
								console.log(response);

							}
						},
					},


			 });
			 
		    console.log(stores);

			stores.filter([ {
				fn  : function(record) {
					console.log(record);
					this.getCountryEditor().setRecord(record);

					Ext.Viewport.setMasked(false);  
					Ext.Viewport.animateActiveItem(this.getCountryEditor(), { type: "slide", direction: "left" });
				},
					scope: this
				}
			]);
			

		}
	},
	
	

	onBackButton: function() {
		Ext.Viewport.animateActiveItem(this.getMainPanel(), { type: "slide", direction: "right" });
	},

	
});
