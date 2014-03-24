/**
 * Created by chshipma on 3/24/14.
 */
export default Ember.ObjectController.extend({
    tagName: "li",
    classNames: ['list-group-item'],
    classNameBindings: ['isSelected:list-group-item-success'],

    isSelected: function(){
        return this.get('parentController.returnValueList').contains(this.get('model'));
    }.property('parentController.returnValueList'),

    actions: {
        selectPerson: function(evt){
            console.log(evt);
        }
    }
});