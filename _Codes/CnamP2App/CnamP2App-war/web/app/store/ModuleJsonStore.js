Ext.define('MyApp.store.ModuleJsonStore', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.ModuleModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'MyApp.model.ModuleModel',
            storeId: 'ModuleJsonStore',
            pageSize: 40,
            proxy: {
                type: 'ajax',
                url: 'ModuleController',
                reader: {
                    type: 'json',
                    root: 'module_grid'
                }
            }
        }, cfg)]);
    }
});