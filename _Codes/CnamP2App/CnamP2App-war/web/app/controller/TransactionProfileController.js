
Ext.define('MyApp.controller.TransactionProfileController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'mainPanelTabpanel',
            selector: '#mainPanelTabpanel',
            xtype: 'Ext.toolbar.Toolbar'
        },
        {
            ref: 'transactionsProfileSearchGridPanel',
            selector: '#transactionsProfileSearchGridPanel',
            xtype: 'Ext.grid.Panel'
        },
        {
            ref: 'transactionsProfileSearchFormPanel',
            selector: '#transactionsProfileSearchFormPanel',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'transactionsProfileResetButton',
            selector: '#transactionsProfileResetButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'transactionsProfileSearchButton',
            selector: '#transactionsProfileSearchButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'transactionsProfileSearchPagingToolbar',
            selector: '#transactionsProfileSearchPagingToolbar',
            xtype: 'Ext.toolbar.Paging'
        },
        {
            ref: 'transactionsProfileAddButton',
            selector: '#transactionsProfileAddButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'transactionsProfileEditButton',
            selector: '#transactionsProfileEditButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'transactionsProfileDeleteButton',
            selector: '#transactionsProfileDeleteButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'transactionsProfileAlterPanel',
            selector: '#transactionsProfileAlterPanel',
            xtype: 'Ext.panel.Panel'
        },
        {
            ref: 'transactionsProfileAlterForm',
            selector: '#transactionsProfileAlterForm',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'transactionsProfileAlterResetButton',
            selector: '#transactionsProfileAlterResetButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'transactionsProfileAlterSubmitButton',
            selector: '#transactionsProfileAlterSubmitButton',
            xtype: 'Ext.button.Button'
        }
    ],
    onTransactionsProfileSearchGridPanel: function(component, eOpts) {
        this.action = "list";
        component.getStore().load({params: {"action": this.action}});
    },
    onTransactionsProfileResetButtonClick: function(button, e, eOpts) {
        this.getTransactionsProfileSearchFormPanel().getForm().reset();
    },
    onTransactionsProfileSearchButtonClick: function(button, e, eOpts) {
        this.action = "search";
        this.getTransactionsProfileSearchGridPanel().getStore().getProxy().extraParams = this.getTransactionsProfileSearchFormPanel().getValues();
        this.getTransactionsProfileSearchGridPanel().getStore().load({params: {"action": this.action, "start": "0", "limit": Ext.getStore('TransactionProfileJsonStore').pageSize}});
    },
    onTransactionsProfileSearchPagingToolbarChange: function(pagingtoolbar, pageData, eOpts) {
        if (this.action == "search") {
            pagingtoolbar.getStore().getProxy().extraParams = this.getTransactionsProfileSearchFormPanel().getValues();
        }
        pagingtoolbar.getStore().getProxy().setExtraParam("action", this.action);
    },
    onTransactionsProfileAddButtonClick: function(button, e, eOpts) {
        if (!this.getTransactionsProfileAlterPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.transactionsProfile.AlterPanel'));
        this.getTransactionsProfileAlterPanel().setTitle("Add Transaction");
        this.getTransactionsProfileAlterPanel().setIconCls('icon-add');
        this.getTransactionsProfileAlterPanel().show();
    },   
    onTransactionsProfileEditButtonClick: function (button, e, eOpts) {

       // if (this.getTransactionsProfileSearchGridPanel().getSelectionModel().hasSelection()) {

         //   if (!this.getTransactionsProfileAlterPanel())
          //      this.getMainPanelTabpanel().add(Ext.create('MyApp.view.transactionsProfile.AlterPanel'));
         //   this.getTransactionsProfileAlterPanel().setTitle("Edit Transaction");
         //  this.getTransactionsProfileAlterPanel().setIconCls('icon-edit');
            
//            this.getTransactionsProfileAlterForm().getForm().load({
//                url: 'TransactionProfileController',
//                params: {action: 'getByID',transactionID : this.getTransactionsProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('transactionID')},
//                failure: function(form, action) {
//                    Ext.Msg.alert("Load failed", action.result.errorMessage);
//                }
//            });
         //  this.getTransactionsProfileAlterResetButton().disable();
           // this.getTransactionsProfileAlterPanel().show();
        //}
       // else {
       //     Ext.Msg.alert('Message', 'Please Select a Transaction To Edit!');
       // }
      utils.generateFile({
                grid: this.getTransactionsProfileSearchGridPanel(),
                url: 'TransactionProfileController?transactionID= 0',
                itemName: 'Transaction \' 0' +  ' \''
            }, this.getTransactionsProfileSearchPagingToolbar());
   
    },
    onTransactionsProfileDeleteButtonClick: function(button, e, eOpts) {

        if (this.getTransactionsProfileSearchGridPanel().getSelectionModel().hasSelection()) {

            utils.deleteItem({
                grid: this.getTransactionsProfileSearchGridPanel(),
                url: 'TransactionProfileController?transactionID=' + this.getTransactionsProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('transactionID'),
                itemName: 'Transaction \' ' + this.getTransactionsProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('transactionID') + ' \''
            }, this.getTransactionsProfileSearchPagingToolbar());

        }
        else {
            Ext.Msg.alert('Message', 'Please Select a transaction To Delete!');
        }
    },
    onTransactionsProfileAjaxCall: function(cfg) {

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
    onTransactionsProfileAlterResetButtonClick: function(button, e, eOpts) {
        this.getTransactionsProfileAlterForm().getForm().reset();
    },
    onTransactionsProfileAlterSubmitButtonClick: function(button, e, eOpts) {
        utils.submitItem(this.getTransactionsProfileAlterForm(), this.getTransactionsProfileSearchPagingToolbar());
    },
    init: function(application) {
        this.action = "list";
        this.control({
            "#transactionsProfileSearchGridPanel": {
                render: this.onTransactionsProfileSearchGridPanel
            },
            "#transactionsProfileResetButton": {
                click: this.onTransactionsProfileResetButtonClick
            },
            "#transactionsProfileSearchButton": {
                click: this.onTransactionsProfileSearchButtonClick
            },
            "#transactionsProfileSearchPagingToolbar": {
                change: this.onTransactionsProfileSearchPagingToolbarChange
            },
            "#transactionsProfileAddButton": {
                click: this.onTransactionsProfileAddButtonClick
            },
            "#transactionsProfileEditButton": {
                click: this.onTransactionsProfileEditButtonClick
            },
            "#transactionsProfileDeleteButton": {
                click: this.onTransactionsProfileDeleteButtonClick
            },
            "#transactionsProfileAlterResetButton": {
                click: this.onTransactionsProfileAlterResetButtonClick
            },
            "#transactionsProfileAlterSubmitButton": {
                click: this.onTransactionsProfileAlterSubmitButtonClick
            }
        });
    }
});