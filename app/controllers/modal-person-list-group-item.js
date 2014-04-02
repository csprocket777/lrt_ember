/**
 * Created by chshipma on 3/24/14.
 */
export default Ember.ObjectController.extend({
    isSelected: function(){
        return this.get('parentController.fieldValue').contains(this.get('model')) || this.get('parentController.selectedPersonnel').contains(this.get('model'));
    }.property('parentController.fieldValue.length', 'parentController.selectedPersonnel.length'),

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