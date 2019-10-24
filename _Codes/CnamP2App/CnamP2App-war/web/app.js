
Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    models: [
        'CustomerProfileModel',
        'ProductProfileModel',
        'CardProfileModel',
        'ModuleModel',
        'TransactionProfileModel'
    ],
    stores: [
        'CustomerProfileJsonStore',
        'ProductProfileJsonStore',
        'CardProfileJsonStore',
        'ModuleJsonStore',
        'TransactionProfileJsonStore'
    ],
    views: [
        'MainView'
    ],
    controllers: [
        'MainMenuToolbarController',
        'MainViewController',
        'CustomerProfileController',
        'ProductProfileController',
        'CardProfileController',
        'ModuleController',
        'TransactionProfileController'
    ],
    name: 'MyApp',
    launch: function() {
        Ext.create('MyApp.view.MainView');
       
    }

});
