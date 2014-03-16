/**
 * Created by chshipma on 10/4/13.
 */
export default DS.Model.extend({
    feature:        DS.attr('string'),
    formalName:     DS.attr('string'),
    option:         DS.attr('string'),
    value:          DS.belongsTo('option'),

//    featureOptionIsDirty: DS.attr('number', {default:0}),
    featureOptionIsDirty: DS.attr('boolean', {default:false}),

    anchorIDHash:function(){
        return "#"+this.get('id');
    }.property('id'),

    anchorID:function(){
        return this.get('id');
    }.property('id'),
});