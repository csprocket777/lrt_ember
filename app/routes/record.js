import PrivilegedRoute from 'appkit/mixins/privileged-route';
export default Ember.Route.extend( PrivilegedRoute, {

	model:function(params){
        return this.get('store').find('record', params.record_id);
	},
	
	setupController:function(controller, model){
		controller.set( 'model', model);
	}
});