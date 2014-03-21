/**
 * Created by chshipma on 3/21/14.
 */
export default Ember.ObjectController.extend({
    active: function(){
        return this.get('model') === this.get('parentController.activeTab');
    }.property('parentController.activeTab')
});