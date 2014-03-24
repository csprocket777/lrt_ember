/**
 * Created by chshipma on 3/24/14.
 */
export default Ember.ObjectController.extend({
    tagName: "li",
    classNames: ['list-group-item'],
    classNameBindings: ['isSelected:list-group-item-success'],

    isSelected: function(){
        return this.get('parentController.selectedPersonnel').contains(this.get('model'));
    }.property('parentController.selectedPersonnel'),

    actions: {
        selectPerson: function(evt){
            if( this.get('parentController.selectedPersonnel').contains(evt) )
            {
                this.get('parentController.selectedPersonnel').removeObject(evt);
            }else{
                this.get('parentController.selectedPersonnel').addObject(evt);
            }
        }
    }
});