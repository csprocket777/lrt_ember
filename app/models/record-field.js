/**
 * Created by chshipma on 2/20/14.
 */
export default DS.Model.extend({
    name:                   DS.attr('string'),
    field_type:             DS.belongsTo('record-field-type'),
    orig_field_type:        DS.belongsTo('record-field-type'),
    field_type_is_dirty:    DS.attr('boolean', {default:false}),
    active:                 DS.attr('boolean'),
    updated_at:             DS.attr(),
    created_at:             DS.attr(),

    fieldAssociations:      DS.hasMany('record-form-field-association', {inverse:'record_field'}),

    anchorIDHash: function(){
        return "#recordField_"+this.get('id');
    }.property('id'),

    anchorID: function(){
        return "recordField_"+this.get('id');
    }.property('id'),

    anchorAccordionIDHash: function(){
        return "#recordField_accordion_"+this.get('id');
    }.property('id'),

    anchorAccordionID: function(){
        return "recordField_accordion_"+this.get('id');
    }.property('id'),

    anchorAccordionDetailsIDHash: function(){
        return "#recordField_accordion_details_"+this.get('id');
    }.property('id'),

    anchorAccordionDetailsID: function(){
        return "recordField_accordion_details_"+this.get('id');
    }.property('id'),
});