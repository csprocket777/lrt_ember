/**
 * Created by chshipma on 10/4/13.
 */
export default Ember.ObjectController.extend({
    active:function(){
        //return this.get('model') === this.get('parentController.selectedCriteriaRevisionModel.firstObject');
        return this.get('model') === this.get('parentController.currentCategory');
    }.property('parentController.currentCategory'),

    actions:{
        tabChanged:function(){
            this.set("parentController.currentCategory", this.get('model'));
            this.set('parentController.currentTopic', this.get('model.topics.firstObject'));
            this.set('parentController.currentCriteria', this.get('model.topics.firstObject.criteria.firstObject'));
        }
    }
});