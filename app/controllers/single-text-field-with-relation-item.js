/**
 * Created by chshipma on 11/13/13.
 */
export default Ember.ObjectController.extend({
   actions:{
       relationshipSelectChanged:function(data)
       {
//           data.modelToManage.set( data.propToTriggerAsDirty , data.newValue.length !== data.originalValue.length );
//           data.modelToManage.set( data.propToTriggerAsDirty , data.newValue.compareEmber( data.originalValue ) === false );
           data.modelToManage.set( data.propToTriggerAsDirty , Ember.compare( data.newValue, data.originalValue ) !== 0 );
       }
   },

    unsavedRecords: Ember.computed.alias('parentController.optionsController.unsavedRecords'),
//        function(){
//        return this.get('parentController.optionsController') ? this.get('parentController.optionsController.unsavedRecords') : this.get('parentController.parentController.optionsController.unsavedRecords');
////        Ember.computed.alias('parentController.optionsController.unsavedRecords'),
//    }.property(),


    isDirtyDidChange: function() {
        var isDirty = this.get('isDirty'),
            unsavedRecords = this.get('unsavedRecords');
        if (isDirty) {
            unsavedRecords.addObject(this.get('model'));
        } else {
            unsavedRecords.removeObject(this.get('model'));
        }
    }.observes('isDirty')
});