/**
 * Created by chshipma on 2/20/14.
 */

import BaseModel from "appkit/models/base-model";
var record_field_value_model = BaseModel.extend({
    field:                      DS.belongsTo('record-field', {inverse: 'value'}),
    record_id:                  DS.belongsTo('record', {inverse:'record_field_values'}),
    value:                      DS.attr(),
    data_type:                  DS.attr('string'),
    field_label:                DS.attr('string'),
    required:                   DS.attr('boolean'),
//    relatedValues:              DS.hasMany('related-record', {polymorphic:true, async: true}),
    relatedValues:              DS.hasMany('relatable', {polymorphic:true, async: true}),
    orig_relatedValues:         DS.hasMany('relatable', {polymorphic:true, async: true}),
//    relatedValues:              DS.belongsTo('related-record', {polymorphic:true, async: true}),

    relationshipWatchList:      ['relatedValues'],
    relatedValueIsDirty:        DS.attr('boolean', {default:false}),

    relatedValueObserver: function(){
        if( this.get('relatedValues.isFulfilled') && this.get('orig_relatedValues.isFulfilled') )
        {
            var dirty = this.get('relatedValues.content.content').compareEmber( this.get('orig_relatedValues.content.content') ) === false;
            this.set('relatedValueIsDirty', dirty);
        }
    }.observes('relatedValues.@each')
});


export default record_field_value_model;