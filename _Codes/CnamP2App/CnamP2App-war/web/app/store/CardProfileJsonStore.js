Ext.define('MyApp.store.CardProfileJsonStore', {
    extend: 'Ext.data.Store',
    requires: [
        'MyApp.model.CardProfileModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                model: 'MyApp.model.CardProfileModel',
                autoLoad: true,
                storeId: 'CardProfileJsonStore',
                pageSize: 40,
                proxy: {
                    type: 'ajax',
                    url: 'CardProfileController',
                    reader: {
                        type: 'json',
                        root: 'cardProfile_grid'                       
                    }
                }
            }, cfg)]);
    }
});