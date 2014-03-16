/**
 * Created by chshipma on 2/20/14.
 */
export default DS.Model.extend({
    name:               DS.attr('string'),
    fields:             DS.hasMany('recordFieldsetFieldAssociation', {inverse:'record_fieldset_template_id'}),
    orig_fields:        DS.hasMany('recordFieldsetFieldAssociation'),

    layout_components:  DS.hasMany('recordLayoutComponent'),

    topLevelComponents: function(){
        return this.get('layout_components').filterBy('isTopLevel', true);
    }.property('layout_components.@each'),

    updated_at:         DS.attr(),
    created_at:         DS.attr(),

    fieldsDirty:        DS.attr('boolean', {default:false}),

    rawFieldList: function(){
        var tmpFieldList = [];
        this.get('fields').forEach(function(item, index, enumerable){
            tmpFieldList.pushObject(item.get('record_field_id'));
        }, this);

        return tmpFieldList;
    }.property('fields.@each'),

    anchorIDHash: function(){
        return "#recordFieldset_"+this.get('id');
    }.property('id'),

    anchorID: function(){
        return "recordFieldset_"+this.get('id');
    }.property('id'),

    dirtyWatcher: function(){
        this.propertyWillChange('isDirty');
        this.set('fieldsDirty', this.get('fields.content').compareEmber(this.get('orig_fields.content')) === false);
        this.propertyDidChange('isDirty');
    }.observes('fields.@each', 'orig_fields.@each'),

    fetchRequiredData: function() {
//      var self = this,
//          fields = this.get('fields'); // fields might be a promise?
//
//      debugger;
//      return new Ember.RSVP.Promise(function(resolve, reject) {
//        fields.on('didLoad', function() {
//          fields.get('')
//          resolve(self);
//        });
//      });
    }
});