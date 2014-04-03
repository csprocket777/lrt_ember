/**
 * Created by chshipma on 3/26/14.
 */
export default Ember.ObjectController.extend({
    recordEditMode: null,
    templateName: "record.index",

    fullView: null,

    viewChangeObserver: function(){
        if( this.get('fullView') !== this.get('model.record_form.views').findBy('view_type', 'full') )
        {
            this.set('fullView', this.get('model.record_form.views').findBy('view_type', 'full'));
        }
    }.observes('model.record_form.views.@each.isLoaded'),

    isEditable: function(){
        return this.get('recordEditMode') === "edit";
    }.property('recordEditMode'),

    unsavedChanges: function(){
        return this.get('model.record_field_values').filterBy('isDirty', true);
    }.property('model.record_field_values.@each.isDirty')

});