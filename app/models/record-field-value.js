/**
 * Created by chshipma on 2/20/14.
 */

import BaseModel from "appkit/models/base-model";
var record_field_value_model = BaseModel.extend({
    field:                      DS.belongsTo('RecordField'),
    record_id:                  DS.belongsTo('Record', {inverse:'record_field_values'}),
    value:                      DS.attr(),
    data_type:                  DS.attr('string'),
    field_label:                DS.attr('string'),
    required:                   DS.attr('boolean'),
//    relatedValues:              DS.hasMany('related-record', {polymorphic:true, async: true}),
    relatedValues:              DS.hasMany('relatable', {polymorphic:true, async: true}),
//    relatedValues:              DS.belongsTo('related-record', {polymorphic:true, async: true}),

    relationshipWatchList:      ['relatedValues']
});


export default record_field_value_model;