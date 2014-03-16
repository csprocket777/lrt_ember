/**
 * Created by chshipma on 10/4/13.
 */
export default Ember.ObjectController.extend({
    active:function(){
        return this.get('model') === this.get('parentController.currentCriteria');
    }.property('parentController.currentCriteria'),

    actions:{
        tabChanged:function(){
            this.set("parentController.currentCriteria", this.get('model'));
        }
    }
});