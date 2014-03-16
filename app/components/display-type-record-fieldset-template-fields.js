/**
 * Created by chshipma on 10/8/13.
 */

var Bootstrap = window.Bootstrap;

export default Ember.Component.extend({
   layoutName: "display-type-record-fieldset-template-fields",

    currentTemplate:null,
    fieldList: null,

    fieldsToRemove: null,
    layoutComponentsToRemove: null,
    layoutComponentsToDelete: null,
    fieldsToAdd: null,
    selectedLayoutComponent: null,
    fieldToRemoveFromLayout:null,

    availableFields: function(){
        return this.get('fieldList').filterBy('active', true).sortBy('name').filter(function(item,index,enumerable){
            return this.get('currentTemplate.rawFieldList').contains(item) === false;
        }, this);
    }.property('fieldList.@each', 'currentTemplate.fields.@each', 'currentTemplate.rawFieldList.@each', 'currentTemplate'),

    fieldsInTemplate: function(){
        return this.get('currentTemplate.fields').sortBy('label');
    }.property('currentTemplate.fields.@each'),

    fieldDetailsDirty: function(){
        return this.get('fieldsInTemplate').any(function(item,index,enumerable){
            return item.get('isDirty');
        }, this);
    }.property('fieldsInTemplate.@each.isDirty'),

    fieldsInLayout: function(){
        return this.get('currentTemplate.fields').filter(function(item,index,enumerable){
            return !Ember.isNone( item.get('record_layout_component_id') );
        }).sortBy('label');
    }.property('currentTemplate.fields.@each.record_layout_component_id'),

    fieldsAvailableForLayout: function(){
        return this.get('currentTemplate.fields').filter(function(item,index,enumerable){
            return Ember.isNone( item.get('record_layout_component_id') );
        }).sortBy('label');
    }.property('currentTemplate.fields.@each.record_layout_component_id', 'fieldsInLayout.length'),

    confirmSingleFieldAssociationDeletionModalButtons: [
        Ember.Object.create({title:'Delete', clicked:"confirmSingleFieldAssociationDeletion", type:'danger'}),
        Ember.Object.create({title:'Cancel', dismiss:'modal'})
    ],

    confirmFieldAssociationDeletionModalButtons: [
        Ember.Object.create({title:'Delete All', clicked:"confirmFieldAssociationDeletion", type:'danger'}),
        Ember.Object.create({title:'Cancel', dismiss:'modal'})
    ],

    layoutItemDeletionModalButtons: [
        Ember.Object.create({title:'Delete', clicked:"confirmLayoutComponentDeletion", type:'danger'}),
        Ember.Object.create({title:'Cancel', dismiss:'modal'})
    ],

    fieldDeletionConfirmation: [
        Ember.Object.create({title:'Delete', clicked:"confirmLayoutFieldDeletion", type:'danger'}),
        Ember.Object.create({title:'Cancel', dismiss:'modal'})
    ],

    addFieldToLayoutComponentButtons: [
        Ember.Object.create({title:'Add Selected Fields', clicked:"continueAddFieldsToLayoutComponent", type:'primary'}),
        Ember.Object.create({title:'Cancel', dismiss:'modal'})
    ],

    _setup:function(){
        this.set('currentTemplate', this.get('model.modelToDisplay.firstObject'));
//        this.set('fieldList', this.get('providedStore').find('recordField'));
        this.set('fieldList', []);
    }.on('init'),


    unsavedRecords: Ember.computed.alias('optionsController.unsavedRecords'),

    isDirtyDidChange: function() {
        var isDirty = this.get('model.modelToDisplay.content'),
            unsavedRecords = this.get('unsavedRecords');

        if( !Ember.isNone(isDirty) )
        {
            isDirty.forEach(function(item,index,enumerable){
                if( item.get('isDirty') ){
                    unsavedRecords.addObject(item);
                } else {
                    unsavedRecords.removeObject(item);
                }
            });
        }
    }.observes('model.modelToDisplay.content.@each.isDirty'),



   actions:{
//       addNew:function()
//       {
//           switch( this.get('providedModel.modelName') )
//           {
//               case "option":
//                   this.get('providedModel.store').createRecord( this.get('providedModel.modelName'),{
//                       optionType: this.get('providedModel'),
//                       modelName: this.get('providedModel.modelName'),
//                       active: true
//                   });
//
//                   Ember.run.next(this, function(){
//                       $('tr.warning:last input:first').focus();
//                   });
//                   break;
//           }
//       }

       addNew:function(evtData)
       {
           switch( this.get('subGroupModel.modelName') )
           {
               case "option":
                   this.sendAction("newAction", evtData);

                   Ember.run.next(this, function(){
                       $('tr.warning:last input:first').focus();
                   });
                   break;
           }
       },

       cancelNew: function(evtData){
           this.sendAction("cancelAction", evtData);
       },


        addFieldToTemplate:function(evt){
            var newAssoc = this.get('providedStore').createRecord('recordFieldsetFieldAssociation', {
                record_fieldset_template_id: this.get('currentTemplate'),
                record_field_id: evt,
                label: evt.get("name"),
                displayType: "text-field"
            });
            newAssoc.save();
            this.get('currentTemplate.fields').addObject(newAssoc);
            newAssoc = null;
        },
        removeFieldFromTemplate: function(evt){
            this.set('fieldsToRemove', evt);
            Bootstrap.ModalManager.show('singleFieldAssociationDeleteConfirmation');
        },

        confirmSingleFieldAssociationDeletion: function(){
            if( this.get('currentTemplate.fields.content') )
            {
                this.get('currentTemplate.fields').removeObject(this.get('fieldsToRemove'));
            }
            this.get('providedStore').deleteRecord(this.get('fieldsToRemove'));
            this.get('fieldsToRemove').save();
            Bootstrap.ModalManager.hide('singleFieldAssociationDeleteConfirmation');
        },
        addAllFieldsToTemplate: function(evt){
                var newAssocToSave = [];
                this.get('availableFields').forEach(function(item){
                    var newAssoc = this.get('providedStore').createRecord('recordFieldsetFieldAssociation', {
                        record_fieldset_template_id: this.get('currentTemplate'),
                        record_field_id: item,
                        label: item.get("name"),
                        displayType: "text-field"
                    });
                    newAssocToSave.pushObject(newAssoc);
                    this.get('currentTemplate.fields').addObject(newAssoc);
                    newAssoc = null;
                }, this);

                newAssocToSave.invoke('save');

        },
        removeAllFieldsFromTemplate:function(evt){
            this.set('fieldsToRemove', []);
            Bootstrap.ModalManager.show('fieldAssociationDeleteConfirmation');
        },

        confirmFieldAssociationDeletion: function(evt){
            while(this.get('currentTemplate.fields.length') > 0){
                var toDelete = this.get('currentTemplate.fields').objectAt( this.get('currentTemplate.fields.length')-1 );
                this.get('currentTemplate.fields').removeObject( toDelete );
                this.get('providedStore').deleteRecord(toDelete);
                toDelete.save();
            }
           Bootstrap.ModalManager.hide('fieldAssociationDeleteConfirmation');
        },


       saveRecordFieldChanges: function(evt){
           evt.save();
       },


       saveAllRecordFieldChanges: function(evt){
            this.get('currentTemplate.fields').filterBy('isDirty', true).invoke('save');
       },

       addNewTemplate: function(evt){
           var newTemplate = this.get('providedStore').createRecord('record-form');
           newTemplate.save();

           this.set('currentTemplate', newTemplate);

           Ember.run.next(function(){
                $('#templateNameField').focus();
           }, this);
       },


       addNewLayoutRow: function(evt){
           var self = this;

           var newRow = this.get('providedStore').createRecord('recordLayoutComponent', {
               displayType: "row",
               record_fieldset_template_id: this.get('currentTemplate')
           });

           newRow.save().then(function(result){
               var newCol = self.get('providedStore').createRecord('recordLayoutComponent', {
                   displayType: "column",
                   record_fieldset_template_id: self.get('currentTemplate'),
                   record_layout_component_id: result,
                   parent_component: result
               });

               newCol.save();
               newCol = null;
           });
           newRow = null;
       },



       addRow: function(evt){
           var self = this;
           var newRow = this.get('providedStore').createRecord('recordLayoutComponent', {
               displayType: "row",
               record_fieldset_template_id: this.get('currentTemplate'),
               record_layout_component_id: evt,
               parent_component: evt
           });

           newRow.save().then(function(result){
               var newCol = self.get('providedStore').createRecord('recordLayoutComponent', {
                   displayType: "column",
                   record_fieldset_template_id: self.get('currentTemplate'),
                   record_layout_component_id: result,
                   parent_component: result
               });
               newCol.save();
               newCol = null;
           });

           newRow = null;
       },
       addColumn: function(evt){
           var newRow = this.get('providedStore').createRecord('recordLayoutComponent', {
               displayType: "column",
               record_fieldset_template_id: this.get('currentTemplate'),
               record_layout_component_id: evt,
               parent_component: evt
           });

           newRow.save();
           newRow = null;
       },


       addField: function(evt){
           this.set('selectedLayoutComponent', evt);
           this.set('fieldsToAdd', []);
           Bootstrap.ModalManager.show('addFieldToLayoutComponentModal');
       },


       deleteItem: function(evt){
           this.set('layoutComponentsToRemove', evt);
           this.set('layoutComponentsToDelete', []);
           Bootstrap.ModalManager.show('layoutItemDeletionConfirmation');
       },

       confirmLayoutComponentDeletion: function(){
           this.recursiveDelete(this.get('layoutComponentsToRemove'));

           this.get('layoutComponentsToDelete').forEach(function(item, index, enumerable){
               item.destroyRecord();
           });
           Bootstrap.ModalManager.hide('layoutItemDeletionConfirmation');
       },

       continueAddFieldsToLayoutComponent: function(evt){
           this.get('fieldsToAdd').forEach(function(item,index,enumerable){
               item.set('record_layout_component_id', this.get('selectedLayoutComponent'));
               item.save();
           }, this);
           Bootstrap.ModalManager.hide('addFieldToLayoutComponentModal');
       },

       removeField: function(evt){
           console.log("REmove Field called: ", evt);
           this.set('fieldToRemoveFromLayout', evt);
           Bootstrap.ModalManager.show('fieldDeletionConfirmation');
       },

       confirmLayoutFieldDeletion: function(){
           this.get('fieldToRemoveFromLayout').set('record_layout_component_id', null);
           this.get('fieldToRemoveFromLayout').save();
           Bootstrap.ModalManager.hide('fieldDeletionConfirmation');
       },

       reloadLayoutData: function(){
           this.get('currentTemplate').reload();
       }
    },

    recursiveDelete: function(itemToDelete){
        itemToDelete.get('fields').forEach(function(fieldItem, fieldIndex, fieldEnumerable){
            fieldItem.set('record_layout_component_id', null);
            fieldItem.save();
        });

        if( !Ember.isNone(itemToDelete.get('child_components.content')) && !Ember.isNone(itemToDelete.get('child_components.length')) )
        {
            itemToDelete.get('child_components.content').forEach(function(item,index,enumerable){

                item.get('fields').forEach(function(fieldItem, fieldIndex, fieldEnumerable){
                    fieldItem.set('record_layout_component_id', null);
                    fieldItem.save();
                });

                if( item.get('child_components.length') )
                {
                    this.recursiveDelete(item);
                }else{
                    this.get('layoutComponentsToDelete').pushObject(item);
                }
            }, this);
        }
        this.get('layoutComponentsToDelete').pushObject(itemToDelete);
    }
});
