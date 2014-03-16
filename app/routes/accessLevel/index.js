export default Ember.Route.extend({
	model:function(params){
		return this.get('store').find('accessLevel', params.access_level_id);
	},
	
	setupController:function(controller, model){
        controller.set('model', model);
        controller.set('privileges', this.get('store').find('privilege'));
        controller.set('privilegeGroups', this.get('store').find('privilegeGroup'));
	}
});