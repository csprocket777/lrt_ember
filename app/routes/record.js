import PrivilegedRoute from 'appkit/mixins/privileged-route';
export default Ember.Route.extend( PrivilegedRoute, {

	model:function(params){
        return this.get('store').find('record', params.record_id);
	},

    afterModel: function(){
        $('.loading').hide();
    },
	
	setupController:function(controller, model){
		controller.set( 'model', model);
	},

    actions:{
        loading: function( transition, originRoute )
        {
            $('.loading').show();
            console.log("I AM LOADING...");
            return false;
        }
    }
});