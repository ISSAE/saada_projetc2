Ext.define('MyApp.model.CustomerProfileModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        {
            name: 'customerky',
            type: 'int'
        },
        {
            name: 'firstName',
            type: 'string'
        },
        {
            name: 'lastName',
            type: 'string'
        },
        {
            name: 'phoneNumber',
            type: 'string'
        },
        {
            name: 'mobileNumber',
            type: 'string'
        },
        {
            name: 'address',
            type: 'string'
        },
        {
            name: 'region',
            type: 'string'
        },
        {
            name: 'zone',
            type: 'string'
        },
        {
            name: 'userstatus',
            type: 'string'
        },
        {
            name: 'modifiedBy',
            type: 'string'
        },        
        {
            name: 'modDateLong',
            convert: function(v) {
                return new Date(v)
            }
        }      
//       , {
//            name: 'lastSuccessLoginDateLong',
//            convert: function(v) {
//                return new Date(v)
//            }
//        },
//        {
//            name: 'lastUnSuccessfullLoginDateLong',
//            convert: function(v) {
//                return new Date(v)
//            }
//        }       
    ]
});