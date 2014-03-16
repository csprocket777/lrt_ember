/**
 * Created by chshipma on 10/4/13.
 */
export default DS.Model.extend({
    isCategory:         DS.attr('boolean'),
    isTopic:            DS.attr('boolean'),
    isCriteria:         DS.attr('boolean'),

    categoryID:         DS.belongsTo('prioritizationItem', {inverse: 'topics'}),
    topicID:            DS.belongsTo('prioritizationItem', {inverse: 'criteria'}),

    categoryOrder:      DS.attr('number'),
    topicOrder:         DS.attr('number'),

    priorityValue:      DS.attr('number'),

    title:              DS.attr('string'),
    tooltipContent:     DS.attr('string'),

    criteriaRevision:   DS.attr('number'),
    active:             DS.attr('boolean'),

    topics:             DS.hasMany('prioritizationItem', {inverse: 'categoryID'}),
    criteria:           DS.hasMany('prioritizationItem', {inverse: 'topicID'}),

    anchorIDHash:function(){
        return "#"+this.get('id');
    }.property('id'),

    anchorID:function(){
        return this.get('id');
    }.property('id'),
});