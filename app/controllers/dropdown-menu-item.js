/**
 * Created by chshipma on 11/6/13.
 */
export default Ember.ObjectController.extend({
    selected:function(){
        return this.get('parentController.selectedMenuItem') === this.get('model');
    }.property('parentController.selectedMenuItem')
});