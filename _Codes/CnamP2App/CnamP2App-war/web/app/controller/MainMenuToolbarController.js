
Ext.define('MyApp.controller.MainMenuToolbarController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'mainPanelTabpanel',
            selector: '#mainPanelTabpanel',
            xtype: 'Ext.toolbar.Toolbar'
        },
        {
            ref: 'mainPanel',
            selector: '#mainPanel',
            xtype: 'Ext.panel.Panel'
        },
        {
            ref: 'mainViewLoginFormPanel',
            selector: '#mainViewLoginFormPanel',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'customersProfileMenuItem',
            selector: '#customersProfileMenuItem',
            xtype: 'Ext.menu.Item'
        },

        {
            ref: 'productsProfileMenuItem',
            selector: '#productsProfileMenuItem',
            xtype: 'Ext.menu.Item'
        },
        {
            ref: 'productsProfileSearchPanel',
            selector: '#productsProfileSearchPanel',
            xtype: 'Ext.panel.Panel'
        },
           {
            ref: 'cardsProfileMenuItem',
            selector: '#cardsProfileMenuItem',
            xtype: 'Ext.menu.Item'
        },      
        {
            ref: 'transactionsProfileMenuItem',
            selector: '#transactionsProfileMenuItem',
            xtype: 'Ext.menu.Item'
        },
        {
            ref: 'transactionsProfileSearchPanel',
            selector: '#transactionsProfileSearchPanel',
            xtype: 'Ext.panel.Panel'
        },
        {
            ref: 'statementsProfileMenuItem',
            selector: '#statementsProfileMenuItem',
            xtype: 'Ext.menu.Item'
        },
        {
            ref: 'statementsProfileSearchPanel',
            selector: '#statementsProfileSearchPanel',
            xtype: 'Ext.panel.Panel'
        },
        
        {
            ref: 'custProdProfilesMenuItem',
            selector: '#custProdProfilesMenuItem',
            xtype: 'Ext.menu.Item'
        },
        {
            ref: 'custProdProfileSearchPanel',
            selector: '#custProdProfileSearchPanel',
            xtype: 'Ext.panel.Panel'
        },
        
        {
            ref: 'custProdProfileSearchPanel',
            selector: '#custProdProfileSearchPanel',
            xtype: 'Ext.panel.Panel'
        },
        {
            ref: 'customersProfileSearchPanel',
            selector: '#customersProfileSearchPanel',
            xtype: 'Ext.panel.Panel'
        },
        
        {
            ref: 'cardsProfileSearchPanel',
            selector: '#cardsProfileSearchPanel',
            xtype: 'Ext.panel.Panel'
        },
        
        {
            ref: 'modulesMenuItem',
            selector: '#modulesMenuItem',
            xtype: 'Ext.menu.Item'
        },
        {
            ref: 'modulesSearchPanel',
            selector: '#modulesSearchPanel',
            xtype: 'Ext.panel.Panel'
        },

        {
            ref: 'functionsMenuItem',
            selector: '#functionsMenuItem',
            xtype: 'Ext.menu.Item'
        },
        {
            ref: 'functionsSearchPanel',
            selector: '#functionsSearchPanel',
            xtype: 'Ext.panel.Panel'
        },        
        {
            ref: 'removedUsersMenuItem',
            selector: '#removedUsersMenuItem',
            xtype: 'Ext.menu.Item'
        },
        {
            ref: 'removedUsersSearchPanel',
            selector: '#removedUsersSearchPanel',
            xtype: 'Ext.panel.Panel'
        },
        {
            ref: 'passwordPolicyMenuItem',
            selector: '#passwordPolicyMenuItem',
            xtype: 'Ext.menu.Item'
        },
        {
            ref: 'passwordPolicyAlterPanel',
            selector: '#passwordPolicyAlterPanel',
            xtype: 'Ext.panel.Panel'
        },
        {
            ref: 'userLogOutMenuItem',
            selector: '#userLogOutMenuItem',
            xtype: 'Ext.menu.Item'
        },
        {
            ref: 'changePasswordMenuItem',
            selector: '#changePasswordMenuItem',
            xtype: 'Ext.menu.Item'
        },
        
        {
            ref: 'changePasswordFormPanel',
            selector: '#changePasswordFormPanel',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'closeTabsMenuItem',
            selector: '#closeTabsMenuItem',
            xtype: 'Ext.menu.Item'
        }

    ],
    onUserLogOutMenuItemClick: function(item, e, eOpts) {
        Ext.Ajax.request({
            url: 'LoginController',
            params: {action: 'logout'},
            success: function(resp, opts) {
                this.getMainViewLoginFormPanel().getForm().reset();
                this.getMainViewLoginFormPanel().show();
                this.getMainPanel().hide();
            },
            scope: this});
    },
    onChangePasswordMenuItemClick: function(item, e, eOpts) {
        if (!this.getChangePasswordFormPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.ChangePasswordFormPanel'));
        this.getChangePasswordFormPanel().show();
    },       
    onCloseTabsMenuItemClick: function(item, e, eOpts) {
        this.getMainPanelTabpanel().removeAll(true);
    },
    onCustomersProfileMenuitemClick: function(item, e, eOpts) {
        if (!this.getCustomersProfileSearchPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.customersProfile.SearchPanel'));
        this.getCustomersProfileSearchPanel().show();
    }, 
    onProductsProfileMenuitemClick: function(item, e, eOpts) {
        if (!this.getProductsProfileSearchPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.productsProfile.SearchPanel'));
        this.getProductsProfileSearchPanel().show();
    }, 
    onCardsProfileMenuitemClick: function(item, e, eOpts) {
        if (!this.getCardsProfileSearchPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.cardsProfile.SearchPanel'));
        this.getCardsProfileSearchPanel().show();
    },
    onTransactionsProfileMenuitemClick: function(item, e, eOpts) {
        if (!this.getTransactionsProfileSearchPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.transactionsProfile.SearchPanel'));
        this.getTransactionsProfileSearchPanel().show();
    },
    onStatementsProfileMenuitemClick: function(item, e, eOpts) {
        if (!this.getStatementsProfileSearchPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.statementsProfile.SearchPanel'));
        this.getStatementsProfileSearchPanel().show();
    },
    onCustProdProfilesMenuitemClick: function(item, e, eOpts) {
        if (!this.getCustProdProfileSearchPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.custprodProfile.SearchPanel'));
        this.getCustProdProfileSearchPanel().show();
    }, 
    
    onRemovedUsersMenuitemClick: function(item, e, eOpts) {
        if (!this.getRemovedUsersSearchPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.removedUsers.SearchPanel'));
        this.getRemovedUsersSearchPanel().show();
    }, 
    onPasswordPolicyMenuitemClick: function(item, e, eOpts) {
        if (!this.getPasswordPolicyAlterPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.passwordPolicy.AlterPanel'));
        this.getPasswordPolicyAlterPanel().show();
    },
    init: function(application) {
        this.control({
            "#userLogOutMenuItem": {
                click: this.onUserLogOutMenuItemClick
            },
            "#changePasswordMenuItem": {
                click: this.onChangePasswordMenuItemClick
            },
            "#closeTabsMenuItem": {
                click: this.onCloseTabsMenuItemClick
            },
            "#customersProfileMenuItem": {
                click: this.onCustomersProfileMenuitemClick
            },
            "#productsProfileMenuItem": {
                click: this.onProductsProfileMenuitemClick
            },
            "#cardsProfileMenuItem": {
                click: this.onCardsProfileMenuitemClick
            },
            "#transactionsProfileMenuItem": {
                click: this.onTransactionsProfileMenuitemClick
            },
            "#statementsProfileMenuItem": {
              click: this.onStatementsProfileMenuitemClick
            },
            "#custProdProfilesMenuItem": {
                click: this.onCustProdProfilesMenuitemClick
            },
            "#modulesMenuItem": {
                click: this.onModulesMenuitemClick
            },
            "#formsMenuItem": {
                click: this.onFormsMenuitemClick
            },
            "#functionsMenuItem": {
                click: this.onFunctionsMenuitemClick
            },
            "#rolesMenuItem": {
                click: this.onRolesMenuitemClick
            },
            "#removedUsersMenuItem": {
                click: this.onRemovedUsersMenuitemClick
            },
            "#passwordPolicyMenuItem": {
                click: this.onPasswordPolicyMenuitemClick
            }
        });
    }

});
