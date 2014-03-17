/**
 * Created by chshipma on 2/20/14.
 */
export default DS.Model.extend({
    name:                       DS.attr('string'),
    field_associations:         DS.hasMany('record-form-field-association', {inverse:'record_form'}),
    orig_field_associations:    DS.hasMany('record-form-field-association'),

    layout_definitions:         DS.hasMany('record-layout-definition'),

    topLevelComponents: function(){
        return this.get('layout_definitions').filterBy('isTopLevel', true);
    }.property('layout_definitions.@each'),

    updated_at:         DS.attr(),
    created_at:         DS.attr(),

    fieldsDirty:        DS.attr('boolean', {default:false}),

    rawFieldList: function(){
        var tmpFieldList = [];
        this.get('field_associations').forEach(function(item, index, enumerable){
            tmpFieldList.pushObject(item.get('record_field'));
        }, this);

        return tmpFieldList;
    }.property('field_associations.@each'),

    anchorIDHash: function(){
        return "#recordFieldset_"+this.get('id');
    }.property('id'),

    anchorID: function(){
        return "recordFieldset_"+this.get('id');
    }.property('id'),

    dirtyWatcher: function(){
        this.propertyWillChange('isDirty');
        this.set('field_associations_dirty', this.get('field_associations.content').compareEmber(this.get('orig_field_associations.content')) === false);
        this.propertyDidChange('isDirty');
    }.observes('field_associations.@each', 'orig_field_associations.@each')
});