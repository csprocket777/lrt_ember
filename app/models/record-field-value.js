/**
 * Created by chshipma on 2/20/14.
 */
export default DS.Model.extend({
    field:                      DS.belongsTo('RecordField'),
    record_id:                  DS.belongsTo('Record', {inverse:'record_field_values'}),
    value:                      DS.attr(),
    data_type:                  DS.attr('string'),
    field_label:                DS.attr('string'),
    required:                   DS.attr('boolean'),
    relatedValues:              DS.hasMany('RelatedRecord', {polymorphic:true, async: true}),

    updated_at:                 DS.attr(),
    created_at:                 DS.attr()
});