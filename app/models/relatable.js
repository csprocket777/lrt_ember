/**
 * Created by chshipma on 2/20/14.
 */

import BaseModel from "appkit/models/base-model";
export default BaseModel.extend({
    record:                  DS.belongsTo('Record')
});