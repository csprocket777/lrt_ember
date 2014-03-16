export default Ember.Route.extend({
	model:function(params){
        return Ember.RSVP.hash({
            accessLevel:        this.store.find('access-level', params.access_level_id),
            privileges:         this.store.find('privilege'),
            privilegeGroups:    this.store.find('privilege-group'),
            optionSubGroup:     this.store.find('option-sub-group').then(function(result){ return result.findBy('modelName', 'access-level'); })
        });
	},
	
	setupController:function(controller, model){
        controller.set('model', model.accessLevel);
        controller.set('privileges', model.privileges);
        controller.set('privilegeGroups', model.privilegeGroups);
        controller.set('optionSubGroup', model.optionSubGroup);
	},


    actions:{
        saveChanges:function(){
            this.get('currentModel.accessLevel').save();
        },

        revertChanges:function(){
            this.get('currentModel.accessLevel').rollback();
        }
    }
});