import PrivilegedRoute from 'appkit/mixins/privileged-route';

export default Ember.Route.extend( PrivilegedRoute, {

	model:function(params){
        return this.get('store').find('record', params.record_id);
	},

    afterModel: function(){
        $('#recordLoading').modal('hide');
    },
	
	setupController:function(controller, model){
		controller.set( 'model', model);
	},

    actions:{
        loading: function( transition, originRoute )
        {
            $('#recordLoading').modal({
                backdrop: 'static',
                keyboard: false
            });
            return false;
        }
    }
});