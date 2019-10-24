
Ext.define('MyApp.controller.ProductProfileController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'mainPanelTabpanel',
            selector: '#mainPanelTabpanel',
            xtype: 'Ext.toolbar.Toolbar'
        },
        {
            ref: 'productsProfileSearchGridPanel',
            selector: '#productsProfileSearchGridPanel',
            xtype: 'Ext.grid.Panel'
        },
        {
            ref: 'productsProfileSearchFormPanel',
            selector: '#productsProfileSearchFormPanel',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'productsProfileResetButton',
            selector: '#productsProfileResetButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'productsProfileSearchButton',
            selector: '#productsProfileSearchButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'productsProfileSearchPagingToolbar',
            selector: '#productsProfileSearchPagingToolbar',
            xtype: 'Ext.toolbar.Paging'
        },
        {
            ref: 'productsProfileAddButton',
            selector: '#productsProfileAddButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'productsProfileEditButton',
            selector: '#productsProfileEditButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'productsProfileDeleteButton',
            selector: '#productsProfileDeleteButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'productsProfileAlterPanel',
            selector: '#productsProfileAlterPanel',
            xtype: 'Ext.panel.Panel'
        },
        {
            ref: 'productsProfileAlterForm',
            selector: '#productsProfileAlterForm',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'productsProfileAlterResetButton',
            selector: '#productsProfileAlterResetButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'productsProfileAlterSubmitButton',
            selector: '#productsProfileAlterSubmitButton',
            xtype: 'Ext.button.Button'
        }
    ],
    onProductsProfileSearchGridPanel: function(component, eOpts) {
        this.action = "list";
        component.getStore().load({params: {"action": this.action}});
    },
    onProductsProfileResetButtonClick: function(button, e, eOpts) {
        this.getProductsProfileSearchFormPanel().getForm().reset();
    },
    onProductsProfileSearchButtonClick: function(button, e, eOpts) {
        this.action = "search";
        this.getProductsProfileSearchGridPanel().getStore().getProxy().extraParams = this.getProductsProfileSearchFormPanel().getValues();
        this.getProductsProfileSearchGridPanel().getStore().load({params: {"action": this.action, "start": "0", "limit": Ext.getStore('ProductProfileJsonStore').pageSize}});
    },
    onProductsProfileSearchPagingToolbarChange: function(pagingtoolbar, pageData, eOpts) {
        if (this.action == "search") {
            pagingtoolbar.getStore().getProxy().extraParams = this.getProductsProfileSearchFormPanel().getValues();
        }
        pagingtoolbar.getStore().getProxy().setExtraParam("action", this.action);
    },
    onProductsProfileAddButtonClick: function(button, e, eOpts) {
        if (!this.getProductsProfileAlterPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.productsProfile.AlterPanel'));
        this.getProductsProfileAlterPanel().setTitle("Add Product");
        this.getProductsProfileAlterPanel().setIconCls('icon-add');
        this.getProductsProfileAlterPanel().show();
    },
    onProductsProfileEditButtonClick: function(button, e, eOpts) {

        if (this.getProductsProfileSearchGridPanel().getSelectionModel().hasSelection()) {

            if (!this.getProductsProfileAlterPanel())
                this.getMainPanelTabpanel().add(Ext.create('MyApp.view.productsProfile.AlterPanel'));
            this.getProductsProfileAlterPanel().setTitle("Edit Product");
            this.getProductsProfileAlterPanel().setIconCls('icon-edit');
            this.getProductsProfileAlterForm().getForm().load({
                url: 'ProductProfileController',
                params: {action: 'getByID',productnum : this.getProductsProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('productnum')},
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            });
            this.getProductsProfileAlterResetButton().disable();
            this.getProductsProfileAlterPanel().show();
        }
        else {
            Ext.Msg.alert('Message', 'Please Select a Product To Edit!');
        }
    },
    onProductsProfileDeleteButtonClick: function(button, e, eOpts) {

        if (this.getProductsProfileSearchGridPanel().getSelectionModel().hasSelection()) {

            utils.deleteItem({
                grid: this.getProductsProfileSearchGridPanel(),
                url: 'ProductProfileController?productnum=' + this.getProductsProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('productnum'),
                itemName: 'Product \' ' + this.getProductsProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('productName') + ' \''
            }, this.getProductsProfileSearchPagingToolbar());

        }
        else {
            Ext.Msg.alert('Message', 'Please Select a Product To Delete!');
        }
    },
    onProductsProfileAjaxCall: function(cfg) {

        var s = cfg.grid.getSelectionModel().getSelection()[0];

        Ext.MessageBox.show({
            title: cfg.title,
            msg: 'Sure to ' + cfg.title + ' ' + cfg.itemName + ' ?',
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.QUESTION,
            scope: this,
            fn: function(btn) {
                if (btn == 'ok') {
                    Ext.Ajax.request({
                        url: cfg.url,
                        params: {action: cfg.action},
                        success: function(resp, opts) {

                            var r = Ext.decode(resp.responseText);
                            if (r.success) {

                                Ext.MessageBox.show({
                                    title: cfg.title,
                                    msg: r.msg,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                                cfg.pagingToolbar.doRefresh();
                            }

                        },
                        failure: function(resp, opts) {
                            Ext.MessageBox.show({
                                title: 'Failed',
                                msg: 'Failed To Process the request!',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.WARNING
                            });
                        },
                        scope: cfg.grid
                    });
                }// end btn ok
            }// end function
        });
    },
    onProductsProfileAlterResetButtonClick: function(button, e, eOpts) {
        this.getProductsProfileAlterForm().getForm().reset();
    },
    onProductsProfileAlterSubmitButtonClick: function(button, e, eOpts) {
        utils.submitItem(this.getProductsProfileAlterForm(), this.getProductsProfileSearchPagingToolbar());
    },
    init: function(application) {
        this.action = "list";
        this.control({
            "#productsProfileSearchGridPanel": {
                render: this.onProductsProfileSearchGridPanel
            },
            "#productsProfileResetButton": {
                click: this.onProductsProfileResetButtonClick
            },
            "#productsProfileSearchButton": {
                click: this.onProductsProfileSearchButtonClick
            },
            "#productsProfileSearchPagingToolbar": {
                change: this.onProductsProfileSearchPagingToolbarChange
            },
            "#productsProfileAddButton": {
                click: this.onProductsProfileAddButtonClick
            },
            "#productsProfileEditButton": {
                click: this.onProductsProfileEditButtonClick
            },
            "#productsProfileDeleteButton": {
                click: this.onProductsProfileDeleteButtonClick
            },
            "#productsProfileAlterResetButton": {
                click: this.onProductsProfileAlterResetButtonClick
            },
            "#productsProfileAlterSubmitButton": {
                click: this.onProductsProfileAlterSubmitButtonClick
            }
        });
    }
});