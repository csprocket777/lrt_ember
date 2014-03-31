import PrivilegedRoute from 'appkit/mixins/privileged-route';

export default Ember.Route.extend( PrivilegedRoute,{

	model:function(params, transition){
        return this.get('store').find('record', transition.params.record.record_id);
	},

    afterModel: function(){
        $('#recordLoading').modal('hide');
    },
	
	setupController:function(controller, model){
		this.controllerFor('record').set('model', model);
        this.controllerFor('record').set('recordEditMode', 'view');
	},

    actions:{
        loading: function( transition, originRoute )
        {
            if( Ember.isNone(this.get('currentModel')) ){
                $('#recordLoading').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                return false;
            }
        }
    }
});