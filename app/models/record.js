/**
 * Created by chshipma on 2/20/14.
 */
export default DS.Model.extend({
    field_template_id:          DS.attr('number'),
    field_template_version:     DS.attr('string'),
    updated_at:                 DS.attr('string'),
    created_at:                 DS.attr('string'),
    record_field_values:        DS.hasMany('record-field-value'),
    orig_record_field_values:   DS.hasMany('record-field-value'),
    systemVersion:              DS.attr('string')
});