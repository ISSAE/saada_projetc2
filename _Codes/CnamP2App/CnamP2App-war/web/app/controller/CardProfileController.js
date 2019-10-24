
Ext.define('MyApp.controller.CardProfileController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'mainPanelTabpanel',
            selector: '#mainPanelTabpanel',
            xtype: 'Ext.toolbar.Toolbar'
        },
        {
            ref: 'cardsProfileSearchGridPanel',
            selector: '#cardsProfileSearchGridPanel',
            xtype: 'Ext.grid.Panel'
        },
        {
            ref: 'cardsProfileSearchFormPanel',
            selector: '#cardsProfileSearchFormPanel',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'cardsProfileResetButton',
            selector: '#cardsProfileResetButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'cardsProfileSearchButton',
            selector: '#cardsProfileSearchButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'cardsProfileSearchPagingToolbar',
            selector: '#cardsProfileSearchPagingToolbar',
            xtype: 'Ext.toolbar.Paging'
        },
        {
            ref: 'cardsProfileAddButton',
            selector: '#cardsProfileAddButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'cardsProfileEditButton',
            selector: '#cardsProfileEditButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'cardsProfileDeleteButton',
            selector: '#cardsProfileDeleteButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'cardsProfileAlterPanel',
            selector: '#cardsProfileAlterPanel',
            xtype: 'Ext.panel.Panel'
        },
        {
            ref: 'cardsProfileAlterForm',
            selector: '#cardsProfileAlterForm',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'cardsProfileAlterResetButton',
            selector: '#cardsProfileAlterResetButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'cardsProfileAlterSubmitButton',
            selector: '#cardsProfileAlterSubmitButton',
            xtype: 'Ext.button.Button'
        }
    ],
    onCardsProfileSearchGridPanel: function(component, eOpts) {
        this.action = "list";
        component.getStore().load({params: {"action": this.action}});
    },
    onCardsProfileResetButtonClick: function(button, e, eOpts) {
        this.getCardsProfileSearchFormPanel().getForm().reset();
    },
    onCardsProfileSearchButtonClick: function(button, e, eOpts) {
        this.action = "search";
        this.getCardsProfileSearchGridPanel().getStore().getProxy().extraParams = this.getCardsProfileSearchFormPanel().getValues();
        this.getCardsProfileSearchGridPanel().getStore().load({params: {"action": this.action, "start": "0", "limit": Ext.getStore('CardProfileJsonStore').pageSize}});
    },
    onCardsProfileSearchPagingToolbarChange: function(pagingtoolbar, pageData, eOpts) {
        if (this.action == "search") {
            pagingtoolbar.getStore().getProxy().extraParams = this.getCardsProfileSearchFormPanel().getValues();
        }
        pagingtoolbar.getStore().getProxy().setExtraParam("action", this.action);
    },
    onCardsProfileAddButtonClick: function(button, e, eOpts) {
        if (!this.getCardsProfileAlterPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.cardsProfile.AlterPanel'));
        this.getCardsProfileAlterPanel().setTitle("Add Card");
        this.getCardsProfileAlterPanel().setIconCls('icon-add');
        this.getCardsProfileAlterPanel().show();
    },
    onCardsProfileEditButtonClick: function(button, e, eOpts) {

        if (this.getCardsProfileSearchGridPanel().getSelectionModel().hasSelection()) {

            if (!this.getCardsProfileAlterPanel())
                this.getMainPanelTabpanel().add(Ext.create('MyApp.view.cardsProfile.AlterPanel'));
            this.getCardsProfileAlterPanel().setTitle("Edit Card");
            this.getCardsProfileAlterPanel().setIconCls('icon-edit');
            this.getCardsProfileAlterForm().getForm().load({
                url: 'CardProfileController',
                params: {action: 'getByID',cardID : this.getCardsProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('cardID')},
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            });
            this.getCardsProfileAlterResetButton().disable();
            this.getCardsProfileAlterPanel().show();
        }
        else {
            Ext.Msg.alert('Message', 'Please Select a Card To Edit!');
        }
    },
    onCardsProfileDeleteButtonClick: function(button, e, eOpts) {

        if (this.getCardsProfileSearchGridPanel().getSelectionModel().hasSelection()) {

            utils.deleteItem({
                grid: this.getCardsProfileSearchGridPanel(),
                url: 'CardProfileController?cardID=' + this.getCardsProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('cardID'),
                itemName: 'Card \' ' + this.getCardsProfileSearchGridPanel().getSelectionModel().getSelection()[0].get('cardID') + ' \''
            }, this.getCardsProfileSearchPagingToolbar());

        }
        else {
            Ext.Msg.alert('Message', 'Please Select a Card To Delete!');
        }
    },
    onCardsProfileAjaxCall: function(cfg) {

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
    onCardsProfileAlterResetButtonClick: function(button, e, eOpts) {
        this.getCardsProfileAlterForm().getForm().reset();
    },
    onCardsProfileAlterSubmitButtonClick: function(button, e, eOpts) {
        utils.submitItem(this.getCardsProfileAlterForm(), this.getCardsProfileSearchPagingToolbar());
    },
    init: function(application) {
        this.action = "list";
        this.control({
            "#cardsProfileSearchGridPanel": {
                render: this.onCardsProfileSearchGridPanel
            },
            "#cardsProfileResetButton": {
                click: this.onCardsProfileResetButtonClick
            },
            "#cardsProfileSearchButton": {
                click: this.onCardsProfileSearchButtonClick
            },
            "#cardsProfileSearchPagingToolbar": {
                change: this.onCardsProfileSearchPagingToolbarChange
            },
            "#cardsProfileAddButton": {
                click: this.onCardsProfileAddButtonClick
            },
            "#cardsProfileEditButton": {
                click: this.onCardsProfileEditButtonClick
            },
            "#cardsProfileDeleteButton": {
                click: this.onCardsProfileDeleteButtonClick
            },
            "#cardsProfileAlterResetButton": {
                click: this.onCardsProfileAlterResetButtonClick
            },
            "#cardsProfileAlterSubmitButton": {
                click: this.onCardsProfileAlterSubmitButtonClick
            }
        });
    }
});