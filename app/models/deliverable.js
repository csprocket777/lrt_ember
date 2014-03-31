/**
 * Created by chshipma on 3/27/14.
 */
export default DS.Model.extend({
    record:                     DS.belongsTo('record', {async:true}),
    jobModality:                DS.belongsTo('option', {async:true}),
    jobComplexity:              DS.belongsTo('option', {async:true}),
    jobContentDuration:         DS.attr('number'),
    jobContentDurationUnit:     DS.belongsTo('option', {async:true}),
    hostedURL:                  DS.attr('string'),
    courseURL:                  DS.attr('string'),
    pecURL:                     DS.attr('string'),
    svnLocation:                DS.attr('string'),
    assessment:                 DS.attr('boolean'),
    contentReadiness:           DS.attr('number'),
    percentNewContent:          DS.attr('number'),
    mobileNeeded:               DS.attr('boolean'),

    saveNeeded: function(){
        return this.get('isDirty')? "warning": false;
    }.property('isDirty')
});