export default Ember.ObjectController.extend({
	needs:['option-sub-group'],

    unsavedRecords: Ember.computed.alias('parentController.optionsController.unsavedRecords'),

    isDirtyDidChange: function() {
        var isDirty = this.get('tabContent'),//.filterBy('isDirty', true),
            unsavedRecords = this.get('unsavedRecords');

        isDirty.forEach(function(item,index,enumerable){
            if( item.get('isDirty') ){
                unsavedRecords.addObject(item);
            } else {
                unsavedRecords.removeObject(item);
            }
        });
    }.observes('tabContent.@each.isDirty'),

    newRecordObserver: function(){
        var unsavedRecords = this.get('parentController.optionsController.unsavedRecords');
        this.get('tabContent').filterBy('isNew', true).forEach( function(item, index, enumerable){
            unsavedRecords.addObject(item);
        });
    }.observes('tabContent.@each.isNew'),

	
	active:function(){
		return this.get('model') === this.get('controllers.option-sub-group.model.optionSubGroup.parentOptionType.childOptions.firstObject');
	}.property('controllers.option-sub-group.model'),
	
	tabContent:function(){
		return this.get('controllers.option-sub-group.model.optionSubGroup.childOptions.content').filter(this.contentContainsModel, this).sort(this.valueSort);
	}.property('controllers.option-sub-group.model.childOptions.content'),//, 'model.option_relation_value'),
	
	contentContainsModel:function( item, index, enumerable ){
		return item.get("option_relation_value").contains( this.get("model") );
	},
	
	actions:{
		relationshipSelectChanged:function(data)
		{
//			data.modelToManage.set( data.propToTriggerAsDirty , data.newValue.length !== data.originalValue.length );
//            data.modelToManage.set( data.propToTriggerAsDirty , data.newValue.compareEmber( data.originalValue ) === false );
            data.modelToManage.set( data.propToTriggerAsDirty , Ember.compare( data.newValue, data.originalValue ) !== 0 );
		},
        addNew:function(){
            switch( this.get('parentController.subGroupModel.modelName') )
            {
                case "option":
                    var newRec = this.get('store').createRecord( this.get('parentController.subGroupModel.modelName'),{
                        optionType: this.get('parentController.subGroupModel'),
                        modelName: this.get('parentController.subGroupModel.modelName'),
                        active: true
                    });

//                    newRec.set('optionRelationValue', Ember.A([this.get('model.id')]) );
                    newRec.get('optionRelationValue').pushObject( this.get('model'));
                    newRec.get('option_relation_value').pushObject( this.get('model'));
                    this.get('tabContent').pushObject(newRec);

                    Ember.run.next(this, function(){
                        $('tr.warning:last input:first').focus();
                    });
                    break;
            }
        },

        cancelNew: function(obj){
            this.get('store').deleteRecord(obj);
            this.get('parentController.optionsController.unsavedRecords').removeObject(obj);
            this.get('tabContent').removeObject(obj);
        }
	},

	valueSort:function(a,b){
		return (a.get('optionValue') > b.get('optionValue')) ? 1: ( (b.get('optionValue') > a.get('optionValue'))? -1: 0 );
	}
});