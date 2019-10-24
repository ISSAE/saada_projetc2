
Ext.define('MyApp.controller.ModuleController', {
    extend: 'Ext.app.Controller',
    refs: [
        {
            ref: 'mainPanelTabpanel',
            selector: '#mainPanelTabpanel',
            xtype: 'Ext.toolbar.Toolbar'
        },
        {
            ref: 'modulesSearchGridPanel',
            selector: '#modulesSearchGridPanel',
            xtype: 'Ext.grid.Panel'
        },
        {
            ref: 'modulesSearchFormPanel',
            selector: '#modulesSearchFormPanel',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'modulesResetButton',
            selector: '#modulesResetButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'modulesSearchButton',
            selector: '#modulesSearchButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'modulesSearchPagingToolbar',
            selector: '#modulesSearchPagingToolbar',
            xtype: 'Ext.toolbar.Paging'
        },
        {
            ref: 'modulesAddButton',
            selector: '#modulesAddButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'modulesEditButton',
            selector: '#modulesEditButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'modulesDeleteButton',
            selector: '#modulesDeleteButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'modulesAlterPanel',
            selector: '#modulesAlterPanel',
            xtype: 'Ext.panel.Panel'
        },
        {
            ref: 'modulesAlterForm',
            selector: '#modulesAlterForm',
            xtype: 'Ext.form.Panel'
        },
        {
            ref: 'modulesAlterResetButton',
            selector: '#modulesAlterResetButton',
            xtype: 'Ext.button.Button'
        },
        {
            ref: 'modulesAlterSubmitButton',
            selector: '#modulesAlterSubmitButton',
            xtype: 'Ext.button.Button'
        }
    ],
    onModuleSearchGridPanel: function(component, eOpts) {
        this.action = "list";
        component.getStore().load({params: {"action": this.action}});
    },
    onModuleResetButtonClick: function(button, e, eOpts) {
       this.getModulesSearchFormPanel().getForm().reset();
    },
    onModuleSearchButtonClick: function(button, e, eOpts) {
        this.action = "search";
        this.getModulesSearchGridPanel().getStore().getProxy().extraParams = this.getModulesSearchFormPanel().getValues();
        this.getModulesSearchGridPanel().getStore().load({params: {"action": this.action, "start": "0", "limit": Ext.getStore('ModuleJsonStore').pageSize}});
    },
    onModuleSearchPagingToolbarChange: function(pagingtoolbar, pageData, eOpts) {
        if (this.action == "search") {
            pagingtoolbar.getStore().getProxy().extraParams = this.getModulesSearchFormPanel().getValues();
        }
        pagingtoolbar.getStore().getProxy().setExtraParam("action", this.action);
    },    
    onModuleAddButtonClick: function(button, e, eOpts) {
        if (!this.getModulesAlterPanel())
            this.getMainPanelTabpanel().add(Ext.create('MyApp.view.modules.AlterPanel'));
        this.getModulesAlterPanel().setTitle("Add Module");
        this.getModulesAlterPanel().setIconCls('icon-add');
        this.getModulesAlterForm().getForm().reset();
        this.getModulesAlterPanel().show();
    },
    onModuleEditButtonClick: function(button, e, eOpts) { 
        
        if (this.getModulesSearchGridPanel().getSelectionModel().hasSelection()) {

            if (!this.getModulesAlterPanel())
                this.getMainPanelTabpanel().add(Ext.create('MyApp.view.modules.AlterPanel'));
            this.getModulesAlterPanel().setTitle("Edit Module");
            this.getModulesAlterPanel().setIconCls('icon-edit');
            this.getModulesAlterForm().getForm().load({
                url: 'ModuleController',
                params: {action: 'getByID', moduleKy: this.getModulesSearchGridPanel().getSelectionModel().getSelection()[0].get('moduleKy')},
                failure: function(form, action) {
                    Ext.Msg.alert("Load failed", action.result.errorMessage);
                }
            });
            this.getModulesAlterResetButton().disable();
            this.getModulesAlterPanel().show();
        }
        else { 
            Ext.Msg.alert('Message', 'Please Select a Module To Edit!');
        }      
    },
    onModuleDeleteButtonClick: function(button, e, eOpts) {

        if (this.getModulesSearchGridPanel().getSelectionModel().hasSelection()) {

            utils.deleteItem({
                grid: this.getModulesSearchGridPanel(),
                url: 'ModuleController?moduleKy=' + this.getModulesSearchGridPanel().getSelectionModel().getSelection()[0].get('moduleKy'),
                itemName: 'Module \' ' + this.getModulesSearchGridPanel().getSelectionModel().getSelection()[0].get('moduleName') + ' \''
            },this.getModulesSearchPagingToolbar());

        }
        else {
            Ext.Msg.alert('Message', 'Please Select an Module To Delete!');
        }
    },
    onModuleAlterResetButtonClick: function(button, e, eOpts) {
        this.getModulesAlterForm().getForm().reset();
    },
    onModuleAlterSubmitButtonClick: function(button, e, eOpts) {
        utils.submitItem(this.getModulesAlterForm(),this.getModulesSearchPagingToolbar());
    },
    init: function(application) {
        this.action = "list";
        this.control({
            "#modulesSearchGridPanel": {
                render: this.onModuleSearchGridPanel
            },
             "#modulesResetButton": {
                click: this.onModuleResetButtonClick
            },
            "#modulesSearchButton": {
                click: this.onModuleSearchButtonClick
            },
            "#modulesSearchPagingToolbar": {
                change: this.onModuleSearchPagingToolbarChange
            },
            "#modulesAddButton": {
                click: this.onModuleAddButtonClick
            },
            "#modulesEditButton": {
                click: this.onModuleEditButtonClick
            },
            "#modulesDeleteButton": {
                click: this.onModuleDeleteButtonClick
            },
            "#modulesAlterResetButton": {
                click: this.onModuleAlterResetButtonClick
            },
            "#modulesAlterSubmitButton": {
                click: this.onModuleAlterSubmitButtonClick
            }
        });
    }

});




