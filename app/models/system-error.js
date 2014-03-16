/**
 * Created by chshipma on 3/13/14.
 */
export default DS.Model.extend({
    description:        DS.attr('string'),
    fileName:           DS.attr('string'),
    lineNumber:         DS.attr('string'),
    message:            DS.attr('string'),
    name:               DS.attr('string'),
    number:             DS.attr('string'),
    stack:              DS.attr('string')
});