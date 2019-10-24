Ext.define('MyApp.store.CustomerProfileJsonStore', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.CustomerProfileModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'MyApp.model.CustomerProfileModel',
            autoLoad: true,
            storeId: 'CustomerProfileJsonStore',
            pageSize: 40,
            proxy: {
                type: 'ajax',
                url: 'CustomerProfileController',
                reader: {
                    type: 'json',
                    root: 'customerProfile_grid'
                }
            }
        }, cfg)]);
    }
});