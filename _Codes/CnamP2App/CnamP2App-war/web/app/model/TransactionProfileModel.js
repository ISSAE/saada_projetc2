Ext.define('MyApp.model.TransactionProfileModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
  
    fields: [
        {
            name: 'transactionID',
            type: 'int'
        },
        {
            name: 'cardID',
            type: 'String'
        },
        {
            name: 'authorizationID',
            type: 'String'
        },
        {
            name: 'trxdate',
            convert: function(v) {
                var timestamp = new Date(v);
                return Ext.Date.format(timestamp, 'Y-m-d');
            }

        },
        {
            name: 'trxamount',
            type: 'int'
        },
        {
            name: 'trxcurrency',
            type: 'String'
        },
        {
            name: 'merchantname',
            type: 'String'
        },
        {
            name: 'merchantcountry',
            type: 'String'
        },
        {
            name: 'postedOn',
            convert: function(v) {
                var timestamp = new Date(v);
                return Ext.Date.format(timestamp, 'Y-m-d');
            }

        }
    ]
});