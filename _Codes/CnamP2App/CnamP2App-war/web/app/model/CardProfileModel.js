Ext.define('MyApp.model.CardProfileModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        
        {
            name: 'cardserno',
            type: 'int'
        },
        {
            name: 'cardID',
            type: 'String'
        },
        {
            name: 'embossing_name',
            type: 'string'
        },
        {
            name: 'issue_date',
            convert: function(v) {
                var timestamp = new Date(v);
                return Ext.Date.format(timestamp, 'Y-m-d');
            }

        },
        
        {
            name: 'expiry_date',
            convert: function(v) {
                var timestamp = new Date(v);
                return Ext.Date.format(timestamp, 'Y-m-d');
            }
        },
        {
            name: 'card_status',
            type: 'string'
        },
         {
            name: 'customerid',
            type: 'int'
        },       
        {
            name: 'modifiedBy',
            type: 'string'
        },
        {
            name: 'modDateLong',
            convert: function(v) {
                var timestamp = new Date(v);
                return Ext.Date.format(timestamp, 'Y-m');
            }

        }
    ]
});