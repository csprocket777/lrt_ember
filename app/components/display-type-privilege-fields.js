/**
 * Created by chshipma on 10/7/13.
 */
export default Ember.Component.extend({
    layoutName: "display-type-privilege-fields",
    newButtonAffixOffset: 0,

    unsavedRecords: Ember.computed.alias('optionsController.unsavedRecords'),

    active: null,

    _setup: function(){
        this.set('active', this.get('parentModelData.firstObject'));
    }.on('init'),

    isDirtyDidChange: function() {
        var isDirty = this.get('model.modelToDisplay.content'),
            unsavedRecords = this.get('unsavedRecords');

        if( !Ember.isNone(isDirty) )
        {
            isDirty.forEach(function(item,index,enumerable){
                if( item.get('isDirty') ){
                    unsavedRecords.addObject(item);
                } else {
                    unsavedRecords.removeObject(item);
                }
            });
        }
    }.observes('model.modelToDisplay.content.@each.isDirty'),
});