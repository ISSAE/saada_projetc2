
Ext.define('MyApp.controller.CustomerProfileController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'mainPanelTabpanel',
            selector: '#mainPanelTabpanel',
            xtype: 'Ext.toolbar.Toolbar'
        },
        {
            ref: 'customersProfileSearchGridPanel',
            selector: '#customersProfileSearchGridPanel',
            xtype: 'Ext.grid.Panel'
        },
        {
            ref: 'customersProfileSearchFormPanel',
            selector: '#customersProfileSearchFormPanel',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'customersProfileResetButton',
            selector: '#customersProfileResetButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'customersProfileSearchButton',
            selector: '#customersProfileSearchButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'customersProfileSearchPagingToolbar',
            selector: '#customersProfileSearchPagingToolbar',
            xtype: 'Ext.toolbar.Paging'
        },
        {
            ref: 'customersProfileAddButton',
            selector: '#customersProfileAddButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'customersProfileEditButton',
            selector: '#customersProfileEditButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'customersProfileDeleteButton',
            selector: '#customersProfileDeleteButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'customersProfileAlterPanel',
            selector: '#customersProfileAlterPanel',
            xtype: 'Ext.panel.Panel'
        },
        {
            ref: 'customersProfileAlterForm',
            selector: '#customersProfileAlterForm',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'customersProfileAlterResetButton',
            selector: '#customersProfileAlterResetButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'customersProfileAlterSubmitButton',
            selector: '#customersProfileAlterSubmitButton',
            xtype: 'Ext.button.Button'
        }
    ],
    onCustomersProfileSearchGridPanel: function(component, eOpts) {
        this.action = "list";
        component.getStore().load({params: {"action": this.action}});
    },
    onCustomersProfileResetButtonClick: function(button, e, eOpts) {
        this.getCustomersProfileSearchFormPanel().getForm().reset();
    },
    onCustomersProfileSearchButtonClick: function(button, e, eOpts) {
        this.action = "search";
        this.getCustomersProfileSearchGridPanel().getStore().getProxy().extraParams = this.getCustomersProfileSearchFormPanel().getValues();
        this.getCustomersProfileSearchGridPanel().getStore().load({params: {"action": this.action, "start": "0", "limit": Ext.getStore('CustomerProfileJsonStore').pageSize}});
    },
    onCustomersProfileSearchPagingToolbarChange: function(pagingtoolbar, pageData, eOpts) {
        if (this.action == "search") {
            pagingtoolbar.getStore().getProxy().extraParams = this.getCustomersProfileSearchFormPanel().getValues();
        }
        pagingtoolbar.getStore().getProxy().setExtraParam("action", this.action);
    },
    onCustomersProfileAddButtonClick: function(button, e, eOpts) {
        if (!this.getCustomersProfileAlterPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.customersProfile.AlterPanel'));
        this.getCustomersProfileAlterPanel().setTitle("Add Customer");
        this.getCustomersProfileAlterPanel().setIconCls('icon-add');
        this.getCustomersProfileAlterForm().getForm().reset();
        this.getCustomersProfileAlterPanel().show();
    },
    onCustomersProfileEditButtonClick: function(button, e, eOpts) {

        if (this.getCustomersProfileSearchGridPanel().getSelectionModel().hasSelection()) {

            if (!this.getCustomersProfileAlterPanel())
                this.getMainPanelTabpanel().add(Ext.create('MyApp.view.customersProfile.AlterPanel'));
            this.getCustomersProfileAlterPanel().setTitle("Edit Customer");
            this.getCustomersProfileAlterPanel().setIconCls('icon-edit');
            this.getCustomersProfileAlterForm().getForm().load({
                url: 'CustomerProfileController',
                params: {action: 'getByID', customerky: this.getCustomersProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('customerky')},
                success: function(form, action) {
                  //Ext.Msg.alert("Load success ", action.result.data.userstatus);
                  //var fid = action.result.data.userstatus;
                  //Ext.getCmp(action.result.data.userstatus).setValue('ACTIVE');
                  //Ext.getDom(action.result.data.userstatus).checked = true;
                  //Ext.Msg.alert("After ", action.result.data.userstatus);
                },
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            });
            this.getCustomersProfileAlterResetButton().disable();
            this.getCustomersProfileAlterPanel().show();
        }
        else {
            Ext.Msg.alert('Message', 'Please Select a Customer To Edit!');
        }
    },
    onCustomersProfileDeleteButtonClick: function(button, e, eOpts) {

        if (this.getCustomersProfileSearchGridPanel().getSelectionModel().hasSelection()) {

            utils.deleteItem({
                grid: this.getCustomersProfileSearchGridPanel(),
                url: 'CustomerProfileController?customerky=' + this.getCustomersProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('customerky'),
                itemName: 'customer \' ' + this.getCustomersProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('firstName') + ' \''
            }, this.getCustomersProfileSearchPagingToolbar());

        }
        else {
            Ext.Msg.alert('Message', 'Please Select a Customer To Delete!');
        }
    },
    onCustomersProfileAjaxCall: function(cfg) {

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
    onCustomersProfileAlterResetButtonClick: function(button, e, eOpts) {
        this.getCustomersProfileAlterForm().getForm().reset();
    },
    onCustomersProfileAlterSubmitButtonClick: function(button, e, eOpts) {
        utils.submitItem(this.getCustomersProfileAlterForm(), this.getCustomersProfileSearchPagingToolbar());
    },
    init: function(application) {
        this.action = "list";
        this.control({
            "#customersProfileSearchGridPanel": {
                render: this.onCustomersProfileSearchGridPanel
            },
            "#customersProfileResetButton": {
                click: this.onCustomersProfileResetButtonClick
            },
            "#customersProfileSearchButton": {
                click: this.onCustomersProfileSearchButtonClick
            },
            "#customersProfileSearchPagingToolbar": {
                change: this.onCustomersProfileSearchPagingToolbarChange
            },
            "#customersProfileAddButton": {
                click: this.onCustomersProfileAddButtonClick
            },
            "#customersProfileEditButton": {
                click: this.onCustomersProfileEditButtonClick
            },
            "#customersProfileDeleteButton": {
                click: this.onCustomersProfileDeleteButtonClick
            },
            "#customersProfileAlterResetButton": {
                click: this.onCustomersProfileAlterResetButtonClick
            },
            "#customersProfileAlterSubmitButton": {
                click: this.onCustomersProfileAlterSubmitButtonClick
            }
        });
    }
});