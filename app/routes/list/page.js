/**
 * Created by chshipma on 3/5/14.
 */
export default Ember.Route.extend({
    offset: null,

    model: function(params){
        this.set("offset", params.page_id);
        return this.store.findQuery('record', {offset: params.page_id, limit: this.controllerFor('list.index').get('itemsPerPage'), nocache:true});
    },

    setupController: function(controller, model){
        this.controllerFor('list.index').setProperties({
            model:          model,
            recordMeta:     Ember.copy(this.store.metadataFor('record')),
            currentPage:    this.get('offset')
        });
    },

    actions:{
        reloadModel: function(){
            this.refresh();
        }
    },
    renderTemplate: function(){
        this.render('list.index', { controller:'list.index' });
    }
});