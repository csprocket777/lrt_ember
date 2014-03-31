/**
 * Created by chshipma on 3/28/14.
 */
import PrivilegedRoute from 'appkit/mixins/privileged-route';
export default Ember.Route.extend( PrivilegedRoute, {

    model:function(params, transition){
        return this.get('store').find('record', transition.params.record.record_id);
    },

    setupController: function(controller, model){
        this.controllerFor('record').set('model', model);
        this.controllerFor('record').set("recordEditMode", "edit");
    }
});