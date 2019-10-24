Ext.define('MyApp.store.TransactionProfileJsonStore', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.TransactionProfileModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'MyApp.model.TransactionProfileModel',
            autoLoad: true,
            storeId: 'TransactionProfileJsonStore',
            pageSize: 40,
            proxy: {
                type: 'ajax',
                url: 'TransactionProfileController',
                reader: {
                    type: 'json',
                    root: 'transactionProfile_grid'
                }
            }
        }, cfg)]);
    }
});