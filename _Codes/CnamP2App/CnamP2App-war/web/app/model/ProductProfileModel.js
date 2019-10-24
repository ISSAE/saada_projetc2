Ext.define('MyApp.model.ProductProfileModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        {
            name: 'productnum',
            type: 'int'
        },
        {
            name: 'productName',
            type: 'string'
        },
        {
            name: 'annualfees',
            type: 'int'
        },
         {
            name: 'producttype',
            type: 'string'
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