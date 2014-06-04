Ext.define("FD4.view.CountryEditor",{
	extend: "Ext.form.Panel",
	xtype: "countryeditor",
	requires: ["Ext.form.FieldSet", "Ext.field.Select"],
	
	config: {
		scrollable: 'vertical',

        items: [{
            xtype: "toolbar",
            docked: "top",
            title: "Country",
            items: [
				{
					xtype: "button",
					ui: "back",
					text: "Back",
					itemId: "backButton"
				},
				{
					xtype: "spacer"
				},
			]},

			{
				xtype: "fieldset",
				title: 'Country Details',
				
				items: [
					{
						xtype: 'textfield',
						name: 'CountryCode',
						label: 'Country Code',
						width: '150%',
						cls: 'textview',
						readOnly: true,
					},
					{
						xtype: 'textfield',
						name: 'CountryText',
						label: 'Country Text',
						width: '150%',
						cls: 'textview',
						readOnly: true,
					},
					
					

				]
			},
        ],
        listeners: [
			 {
				delegate: "#backButton",
				event: "tap",
				fn: "onBackButtonTap"
			},
			{
				delegate: "#viewButton",
				event: "tap",
				fn: "onViewButtonTap"
			},
			{
				delegate: "#mapButton",
				event: "tap",
				fn: "onMapButtonTap"
			}
        ]
	},

	
	onViewButtonTap: function(button,e,options) {
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
            message: 'Loading....'
        });
		this.fireEvent("ViewCustomerCommand", this.getRecord(), button);
	},	

	onBackButtonTap: function() {
		this.fireEvent("backCommand",this);
	},

	onMapButtonTap: function() {
		this.fireEvent("mapCommand", this.getRecord());
	}
});
