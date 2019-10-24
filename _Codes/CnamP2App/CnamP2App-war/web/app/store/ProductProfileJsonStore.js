Ext.define('MyApp.store.ProductProfileJsonStore', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.ProductProfileModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                model: 'MyApp.model.ProductProfileModel',
                autoLoad: true,
                storeId: 'ProductProfileJsonStore',
                pageSize: 40,
                proxy: {
                    type: 'ajax',
                    url: 'ProductProfileController',
                    reader: {
                        type: 'json',
                        root: 'productProfile_grid'                       
                    }
                }
            }, cfg)]);
    }
});