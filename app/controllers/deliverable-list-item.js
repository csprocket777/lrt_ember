/**
 * Created by chshipma on 4/1/14.
 */
export default Ember.ObjectController.extend({

    // TODO: Devise a method to make the dynamic tooltips administratable

    actionColumn: function(){
        return this.get('model.modelIsDirty') ? "col-md-1":false;
    }.property('model.modelIsDirty'),

    actions:{
        saveDeliverable: function(){
            this.get('model').save();
        },

        revertDeliverable: function(){
            this.get('model').rollback();
        },

        removeDeliverable: function(){
            var self = this;
            this.get('model').deleteRecord();
            this.get('model').save().then(function(){
                self.send('reloadDeliverables');
            });
        }
    }
});