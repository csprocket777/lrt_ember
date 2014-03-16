/**
 * Created by chshipma on 3/5/14.
 */
export default Ember.Route.extend({
    model: function(params){
        return this.store.findQuery('record', {offset: this.controllerFor('list.index').get('currentPage'), limit: this.controllerFor('list.index').get('itemsPerPage'), nocache:true});
    },

    setupController: function(controller, model){
        controller.setProperties({
            model:          model,
            recordMeta:     Ember.copy(this.store.metadataFor('record')),
            currentPage:    1
        });
    },

    actions:{
        reloadModel: function(){
            this.get('currentModel').reload();
        }
    }
});