export default DS.Model.extend({
    optionType:				DS.attr('number'),
    optionValue:			DS.attr('string'),
    optionRelationType:		DS.attr('string'),
    optionRelationValue:	DS.attr('number'),
    active:					DS.attr('number'),

    isVendor:function(){
        return this.get('id') === "201";
    }.property('id'),

    isFullTime:function(){
        return this.get('id') === "108";
    }.property('id'),

    isContractor:function(){
        return this.get('id') === "109";
    }.property('id')
});