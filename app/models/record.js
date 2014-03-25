/**
 * Created by chshipma on 2/20/14.
 */
export default DS.Model.extend({
    record_form:                DS.belongsTo('record-form'),
    field_template_version:     DS.attr('string'),
    updated_at:                 DS.attr('string'),
    created_at:                 DS.attr('string'),
    record_field_values:        DS.hasMany('record-field-value', {inverse: 'record_id'}),
    orig_record_field_values:   DS.hasMany('record-field-value'),
    systemVersion:              DS.attr('string')
});