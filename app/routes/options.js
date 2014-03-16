export default Ember.Route.extend({
	model:function(){
		return this.get('store').find('optionSubGroup');
	},
	
	setupController:function(controller, model){
		controller.set('model', model);

        controller.setSelectedOptionGroup();

        if( this.controllerFor('options').get('selectedOptionGroup') )
        {
            this.transitionTo("optionSubGroup", this.controllerFor('options').get('selectedOptionGroup.id'));
        }
	},
	
	actions:{
//        restorePreviousOptionSubGroupChoice: function(evt){
//            this.transitionTo('optionSubGroup',evt);
//        },
		saveChanges:function(){
            this.get("controller.unsavedRecords").invoke('save');
			this.processChangeResult();
		},
		
		revertChanges:function(){
            this.get("controller.unsavedRecords").invoke('rollback');
			this.processChangeResult();
		}
	},

	processChangeResult:function(){
		this.controllerFor('optionSubGroup').set('changesToProcess', true);
	}
});