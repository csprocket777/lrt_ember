export default DS.Model.extend({
    optionType:				DS.attr('string'),
    optionValue:			DS.attr('string'),
    optionRelationType:		DS.attr('string'),
    optionRelationValue:	DS.attr('number'),
    active:					DS.attr('boolean')
});