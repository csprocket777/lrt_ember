/**
 * Created by chshipma on 10/8/13.
 */

var Bootstrap = window.Bootstrap;

export default Ember.Component.extend({
   layoutName: "display-type-record-forms",

    currentForm:null,
    fieldList: null,

    fieldsToRemove: null,
    layoutComponentsToRemove: null,
    layoutComponentsToDelete: null,
    fieldsToAdd: null,
    selectedLayoutComponent: null,
    fieldToRemoveFromLayout:null,

    layoutChangesToSave: null,

    availableFields: function(){
        return this.get('fieldList') ? this.get('fieldList').filterBy('active', true).sortBy('name').filter(function(item,index,enumerable){
            return this.get('currentForm.rawFieldList').contains(item) === false;
        }, this) : [];
    }.property('fieldList.length', 'currentForm.rawFieldList.length'),

//    fieldsInTemplate: function(){
//        return this.get('currentForm.field_associations').sortBy('label');
//    }.property('currentForm.field_associations.length'),

    fieldDetailsDirty: function(){
        return this.get('currentForm.field_associations').any(function(item,index,enumerable){
            return item.get('isDirty');
        }, this);
    }.property('currentForm.field_associations.@each.isDirty'),

    fieldsInLayout: function(){
        return this.get('currentForm.field_associations').filter(function(item,index,enumerable){
            return !Ember.isNone( item.get('record_layout_definition') );
        }).sortBy('label');
    }.property('currentForm.field_associations.length'),

    fieldsAvailableForLayout: function(){
        return this.get('currentForm.field_associations').filter(function(item,index,enumerable){
            return Ember.isNone( item.get('record_layout_definition') );
        }).sortBy('label');
    }.property('currentForm.field_associations.@each.record_layout_definition', 'fieldsInLayout.length'),

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
        this.set('currentForm', this.get('model.modelToDisplay.firstObject'));
        this.set('fieldList', this.get('model._preload.fields'));
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
            var newAssoc = this.get('providedStore').createRecord('record-form-field-association', {
                record_form: this.get('currentForm'),
                record_field: evt,
                label: evt.get("name"),
                displayType: "text-field"
            }).save();
        },
        removeFieldFromTemplate: function(evt){
            this.set('fieldsToRemove', evt);
            Bootstrap.ModalManager.show('singleFieldAssociationDeleteConfirmation');
        },

        confirmSingleFieldAssociationDeletion: function(){
            if( this.get('currentForm.field_associations.content') )
            {
                this.get('currentForm.field_associations').removeObject(this.get('fieldsToRemove'));
            }
//            this.get('providedStore').deleteRecord(this.get('fieldsToRemove'));
            this.get('fieldsToRemove').destroyRecord();
            Bootstrap.ModalManager.hide('singleFieldAssociationDeleteConfirmation');
        },
        addAllFieldsToTemplate: function(evt){
                var newAssocToSave = [];
                this.get('availableFields').forEach(function(item){
                    var newAssoc = this.get('providedStore').createRecord('record-form-field-association', {
                        record_form: this.get('currentForm'),
                        record_field: item,
                        label: item.get("name"),
                        displayType: "text-field"
                    });
                    newAssocToSave.pushObject(newAssoc);
                    this.get('currentForm.field_associations').addObject(newAssoc);
                    newAssoc = null;
                }, this);

                newAssocToSave.invoke('save');

        },
        removeAllFieldsFromTemplate:function(evt){
            this.set('fieldsToRemove', []);
            Bootstrap.ModalManager.show('fieldAssociationDeleteConfirmation');
        },

        confirmFieldAssociationDeletion: function(evt){
            while(this.get('currentForm.field_associations.length') > 0){
                var toDelete = this.get('currentForm.field_associations').objectAt( this.get('currentForm.field_associations.length')-1 );
                this.get('currentForm.field_associations').removeObject( toDelete );
//                this.get('providedStore').deleteRecord(toDelete);
                toDelete.destroyRecord();
            }
           Bootstrap.ModalManager.hide('fieldAssociationDeleteConfirmation');
        },


       saveRecordFieldChanges: function(evt){
           evt.save();
       },


       saveAllRecordFieldChanges: function(evt){
            this.get('currentForm.field_associations').filterBy('isDirty', true).invoke('save');
       },

       addNewTemplate: function(evt){
           var newTemplate = this.get('providedStore').createRecord('record-form');
           newTemplate.save();

           this.set('currentForm', newTemplate);

           Ember.run.next(function(){
                $('#templateNameField').focus();
           }, this);
       },


       addNewLayoutRow: function(evt){
           var self = this;

           var newRow = this.get('providedStore').createRecord('record-layout-definition', {
               displayType: "row",
               record_form: this.get('currentForm'),
               order: this.get('currentForm.topLevelDefinitions.length')
           });

           newRow.save().then(function(result){
               var newCol = self.get('providedStore').createRecord('record-layout-definition', {
                   displayType: "column",
                   record_form: self.get('currentForm'),
                   record_layout_definition: result,
                   order: 0
               });

               newCol.save();
           });
       },



       addRow: function(evt){
           var self = this;
           var newRow = this.get('providedStore').createRecord('record-layout-definition', {
               displayType: "row",
               record_form: this.get('currentForm'),
               record_layout_definition: evt,
               order: 0
           });

           newRow.save().then(function(result){
               var newCol = self.get('providedStore').createRecord('record-layout-definition', {
                   displayType: "column",
                   record_form: self.get('currentForm'),
                   record_layout_definition: result,
                   order: 0
               });
               newCol.save();
               newCol = null;
           });

           newRow = null;
       },
       addColumn: function(evt){
           var newRow = this.get('providedStore').createRecord('record-layout-definition', {
               displayType: "column",
               record_form: this.get('currentForm'),
               record_layout_definition: evt,
               order: evt.get('child_definitions.length')
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

            var self = this;
            var parentContextToReorder =
                    self.get('layoutComponentsToRemove.record_layout_definition') ?
                        self.get('layoutComponentsToRemove.record_layout_definition.child_definitions').filter(function(item,index,enumerable){
                            return item.get('id') !== self.get('layoutComponentsToRemove.id');
                        }, this).sortBy('order') :
                        self.get('currentForm.topLevelDefinitions').filter(function(item,index,enumerable){
                            return item.get('id') !== self.get('layoutComponentsToRemove.id');
                        }, this).sortBy('order');

            // TO SOLVE FOR A RACE CONDITION, EMPLOYING PROMISES TO ENSURE THAT THE DELETIONS HAPPEN IN THE ORDER IN WHICH THEY NEED TO HAPPEN
            var deletePromise = new Ember.RSVP.Promise(function(resolve, reject){
               // RESOLVE WITH THE RESULT OF THE RECURSIVE DELETION RESULT
               resolve(self.recursiveDelete( self.get('layoutComponentsToRemove') ));
            }).then(function(value){
               new Ember.RSVP.Promise(function(resolve, reject){
                   // RESOLVE WITH THE RESULT OF THE RECURSIVE DELETION RESULT
                   self.set('layoutChangesToSave', []);
//                   var contextToOrderFix =
//                       self.get('layoutComponentsToRemove.record_layout_definition') ?
//                           self.get('layoutComponentsToRemove.record_layout_definition.child_definitions').sortBy('order') :
//                           self.get('currentForm.topLevelDefinitions').sortBy('order');

                   resolve(self.fixDefinitionOrderValues( parentContextToReorder ));
               }).then(function(value){
                   // WHEN ALL ARE DELETED SUCCESSFULLY, CLOSE THE DIALOG
                   self.get('layoutChangesToSave').invoke('save');
                   Bootstrap.ModalManager.hide('layoutItemDeletionConfirmation');
               });

            }, function(reason){
               // OTHERWISE, WE HAVE AN ERROR
               console.log("Not resolved", reason);
            });
       },

       continueAddFieldsToLayoutComponent: function(evt){
           this.get('fieldsToAdd').forEach(function(item,index,enumerable){
               item.set('order', this.get('selectedLayoutComponent.fields.length'));
               item.set('record_layout_definition', this.get('selectedLayoutComponent'));
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
           this.get('fieldToRemoveFromLayout').set('record_layout_definition', null);
           this.get('fieldToRemoveFromLayout').save();
           Bootstrap.ModalManager.hide('fieldDeletionConfirmation');
       },

       reloadLayoutData: function(){
           this.get('currentForm').reload();
       },

       changeOrderUp: function(evt, itemType){
           var curOrder = parseInt(evt.get('order'), 10);

           switch( itemType )
           {
               case "layoutDefinition":

                   var defToSwap = evt.get('record_layout_definition') ?
                       evt.get('record_layout_definition.child_definitions').findBy('order', curOrder-1):
                       this.get('currentForm.topLevelDefinitions').findBy('order', curOrder-1);

                   defToSwap.incrementProperty('order');
                   defToSwap.save();
                   evt.decrementProperty('order');
                   evt.save();
                   break;

               case "field":
                   var fieldToSwapWith = evt.get('record_layout_definition.fields').findBy('order', curOrder-1);
                   if( fieldToSwapWith )
                   {
                        fieldToSwapWith.incrementProperty('order');
                        fieldToSwapWith.save();
                        evt.decrementProperty('order');
                        evt.save();
                   }
                   break;
           }
       },

       changeOrderDown: function(evt, itemType){
            var curOrder = parseInt(evt.get('order'), 10);
            switch( itemType )
            {
               case "layoutDefinition":
                   var defToSwap = evt.get('record_layout_definition') ?
                       evt.get('record_layout_definition.child_definitions').findBy('order', curOrder+1):
                       this.get('currentForm.topLevelDefinitions').findBy('order', curOrder+1);

                   defToSwap.decrementProperty('order');
                   defToSwap.save();
                   evt.incrementProperty('order');
                   evt.save();
                   break;

               case "field":
                   var fieldToSwapWith = evt.get('record_layout_definition.fields').findBy('order', curOrder+1);
                   if( fieldToSwapWith )
                   {
                       fieldToSwapWith.decrementProperty('order');
                       fieldToSwapWith.save();
                       evt.incrementProperty('order');
                       evt.save();
                   }
                   break;
            };

       },

       toggleFormPreview: function(){
           this.$().find('.layoutArea').toggleClass('editMode');
       },

       addRecordFormElement: function(evtModel, elementType){
           var self = this,
               newOrder = evtModel.get("order");

           var orderAdj = this.get('currentForm.topLevelDefinitions').filter(function(item,index,enumerable){
               return item.get('order') >= evtModel.get('order');
           }, this);

           orderAdj.forEach(function(item,index,enumerable){
               item.incrementProperty('order');
           }, this);

           orderAdj.invoke('save');

           var self = this;

           switch( elementType )
           {
               case "divider":
                   var newRow = this.get('providedStore').createRecord('record-layout-definition', {
                       displayType: "divider",
                       record_form: this.get('currentForm'),
                       order: newOrder
                   });

                   newRow.save();
                   break;

               case "row":
                   var newRow = this.get('providedStore').createRecord('record-layout-definition', {
                       displayType: "row",
                       record_form: this.get('currentForm'),
                       order: newOrder
                   });

                   newRow.save().then(function(result){
                       var newCol = self.get('providedStore').createRecord('record-layout-definition', {
                           displayType: "column",
                           record_form: self.get('currentForm'),
                           record_layout_definition: result,
                           order: 0
                       });
                       newCol.save();
                   });
                   break;

               case "tab-container":
                   var newRow = this.get('providedStore').createRecord('record-layout-definition', {
                       displayType: "tab-container",
                       record_form: this.get('currentForm'),
                       order: newOrder
                   });

                   newRow.save();
                   break;

               case "tab":
                   var newTab = this.get('providedStore').createRecord('record-layout-definition', {
                       displayType: "tab",
                       record_form: this.get('currentForm'),
                       order: newOrder+1,
                       record_layout_definition: evtModel.get("record_layout_definition"),
                       hasTitle: true,
                       title: "New Tab"
                   });

                   newTab.save();
                   break;
           }
       }
    },

    recursiveDelete: function(itemToDelete){
        var self = this;

        return new Ember.RSVP.Promise( function(resolve, reject){
            if( itemToDelete.get('fields') )
            {
                itemToDelete.get('fields').forEach(function(fieldItem, fieldIndex, fieldEnumerable){
                    fieldItem.set('record_layout_definition', null);
                    fieldItem.set('order', null);
                    fieldItem.save();
                });
            };

            var deletePromiseArray = [];

            if( !Ember.isNone(itemToDelete.get('child_definitions.content')) && !Ember.isNone(itemToDelete.get('child_definitions.length')) )
            {
                itemToDelete.get('child_definitions.content').forEach(function(item,index,enumerable){
                    var tmpDelPromise = new Ember.RSVP.Promise(function(resolve,reject){
                        resolve(self.recursiveDelete(item));
                    });
                    deletePromiseArray.pushObject( tmpDelPromise );
                }, this);
            };

            Ember.RSVP.all(deletePromiseArray).then(function(array){
                itemToDelete.destroyRecord().then(function(){
                    resolve(1);
                }, function(){
                    reject("deletion error");
                });
            });
        });

    },

    fixDefinitionOrderValues: function(itemsToOrder){
        var self = this;

        itemsToOrder.forEach(function(item, index, enumerable){
            item.set('order', index);
            self.get('layoutChangesToSave').pushObject(item);
//            item.save();

            if( !Ember.isNone(item.get('child_definitions.content')) && !Ember.isNone(item.get('child_definitions.length')) )
            {
                self.fixDefinitionOrderValues( item.get('child_definitions.content').sortBy('order') );
            };
        });

        return true;
    }
});
