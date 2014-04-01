/**
 * Created by chshipma on 3/6/14.
 */

import BaseModel from "appkit/models/base-model";
export default BaseModel.extend({
    record:     DS.belongsTo('Record'),
//    record_field_values:    DS.hasMany('record-field-value'),
});