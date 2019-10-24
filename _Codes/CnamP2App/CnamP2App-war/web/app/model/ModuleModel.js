Ext.define('MyApp.model.ModuleModel', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.Field'
    ],
    fields: [
        {
            name: 'moduleKy',
            type: 'int'
        },
        {
            name: 'moduleName',
            type: 'string'
        }
    ]


});
