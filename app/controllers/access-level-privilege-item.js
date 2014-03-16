export default Ember.ObjectController.extend({
    unsavedRecords: Ember.computed.alias('parentController.unsavedRecords'),
//        function(){
//        return this.get('parentController.optionsController') ? this.get('parentController.optionsController.unsavedRecords') : this.get('parentController.parentController.optionsController.unsavedRecords');
////        Ember.computed.alias('parentController.optionsController.unsavedRecords'),
//    }.property(),


    isDirtyDidChange: function() {
        var isDirty = this.get('isDirty') || this.get('isNew'),
            unsavedRecords = this.get('unsavedRecords');
        if (isDirty) {
            unsavedRecords.addObject(this.get('model'));
        } else {
            unsavedRecords.removeObject(this.get('model'));
        }
    }.observes('isDirty', 'isNew')
});