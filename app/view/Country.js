Ext.define("FD4.view.Country",{
	extend: "Ext.form.Panel",
	xtype: "country",
	requires: ["Ext.form.FieldSet", "Ext.field.Select"],
	
	config: {
		title: 'Country',
		iconCls: "users",
		scrollable: 'vertical',
		
        items: [
			{
				xtype: "fieldset",
				title: 'Country',
				items: [
					{
						xtype: 'textfield',
						name: 'CountryCode',
						label: 'Country Code',
						cls: 'textview',
						width: '150%',
						placeHolder: "Enter Country",
						value: 'SG',
					},
					{
						xtype: "button",
						ui: "action",
						text: "Search",
						itemId: "searchButton"
					},
				]
			},
        ],
        listeners: [
			{
				delegate: "#searchButton",
				event: "tap",
				fn: "onSearchButtonTap"
			},
        ]
	},

	onSearchButtonTap: function(button,e,options) {
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
            message: 'Loading....'
        });
		this.fireEvent("SearchCountryCommand", this.getRecord(), button);
	},

});
