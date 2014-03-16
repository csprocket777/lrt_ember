export default Ember.Route.extend({
	model:function(params){
//        optionSubGroup:     this.store.find('option-sub-group').then(function(result){ return result.findBy('modelName', 'access-level'); })
//		return this.get('store').find('accessLevel', params.access_level_id);
        return Ember.RSVP.hash({
            accessLevel:        this.store.find('access-level', params.access_level_id),
            privileges:         this.store.find('privilege'),
            privilegeGroups:    this.store.find('privilege-group'),
            optionSubGroup:     this.store.find('option-sub-group').then(function(result){ return result.findBy('modelName', 'access-level'); })
        });
	},
	
	setupController:function(controller, model){
//        controller.set('accessLevels', this.get('store').find('accessLevel'));
//        controller.set('model', model);
//        controller.set('privileges', this.get('store').find('privilege'));
//        controller.set('privilegeGroups', this.get('store').find('privilegeGroup'));

        controller.set('model', model.accessLevel);
        controller.set('privileges', model.privileges);
        controller.set('privilegeGroups', model.privilegeGroups);
        controller.set('optionSubGroup', model.optionSubGroup);
	},


    actions:{
        saveChanges:function(){
//            this.controllerFor('accessLevelPermissionPrivilege').get('model').save();
            this.get('currentModel.accessLevel').save();
        },

        revertChanges:function(){
//            this.controllerFor('accessLevelPermissionPrivilege').get('model').rollback();
            this.get('currentModel.accessLevel').rollback();
        }
    }
});