/**
 * Created by chshipma on 10/4/13.
 */
export default Ember.ObjectController.extend({
    active:function(){
        return this.get('model') === this.get('parentController.currentTopic');
    }.property('parentController.currentTopic'),

    actions:{
        tabChanged:function(){
            this.set("parentController.currentTopic", this.get('model'));
            this.set('parentController.currentCriteria', this.get('model.criteria.firstObject'));
        }
    }
});