/**
 * Created by chshipma on 10/4/13.
 */
export default Ember.ObjectController.extend({
    currentCriteria:function(){
        return this.get('parentController.currentTopic.criteria.firstObject');
    }.property('parentController.currentTopic'),

    active:function(){
        return this.get('model') === this.get('parentController.currentTopic');
    }.property('parentController.currentTopic'),

    attributeBindings: ['data-parent'],

    accordionID:function(){
        return "accordion_"+this.get('id');
    }.property(),

    accordionIDHash:function(){
        return "#"+this.get('accordionID');
    }.property('accordionID'),

    contentPanelID:function(){
        return "contentPanel_"+this.get('id');
    }.property(),

    contentPanelIDHash:function(){
        return "#"+this.get('contentPanelID');
    }.property('contentPanelID')
});