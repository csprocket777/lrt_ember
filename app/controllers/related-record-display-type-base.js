/**
 * Created by chshipma on 3/25/14.
 */
export default Ember.ArrayController.extend({
    recordType: null,
    recordValueModel: null,
    recordEditMode: null,
    parentController: null,
    isEditable: function(){
        return this.get('parentController.recordEditMode') === "edit";
    }.property('parentController.recordEditMode'),
    layoutDefinitionModel: null,

    model: function(){
        return this.get('store').find( this.get('layoutDefinitionModel.related_model'), {record: this.get('recordValueModel.id')} );
    }.property('layoutDefinitionModel.related_model', 'recordValueModel.id')
});