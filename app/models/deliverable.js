/**
 * Created by chshipma on 3/27/14.
 */

import BaseModel from "appkit/models/base-model";

export default BaseModel.extend({
    content:                    null,
    record:                     DS.belongsTo('record', {async:true}),
    jobModality:                DS.belongsTo('option'),
    jobComplexity:              DS.belongsTo('option'),
    jobContentDuration:         DS.attr('number'),
    jobContentDurationUnit:     DS.belongsTo('option'),
    hostedURL:                  DS.attr('string'),
    courseURL:                  DS.attr('string'),
    pecURL:                     DS.attr('string'),
    svnLocation:                DS.attr('string'),
    assessment:                 DS.attr('boolean'),
    contentReadiness:           DS.attr('number'),
    percentNewContent:          DS.attr('number'),
    mobileNeeded:               DS.attr('boolean'),

    relationshipWatchList:      ['jobComplexity', 'jobModality', 'jobContentDurationUnit'],

    saveNeeded: function(){
        return this.get('isDirty')? "warning": false;
    }.property('isDirty')
});