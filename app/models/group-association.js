//import Bootstrap from 'vendor/ember-addons.bs_for_ember/dist/js/bs-core.min.js';


var Bootstrap = window.Bootstrap;
export default DS.Model.extend({
    //optionType:				DS.attr('string'),
    //optionValue:			DS.attr('string'),
    optionRelationType:		DS.attr('string'),
    //optionRelationValue:	DS.attr('number'),
    //active:					DS.attr('number')


    optionType:				DS.belongsTo('optionSubGroup'),
    optionValue:			DS.attr('string'),
    optionRelationValue:	DS.attr(),
    active:					DS.attr('boolean'),
    option_relation_value:	DS.hasMany('option'),
    people:                 DS.hasMany('user', {inverse: 'groupAssociation'}),

    relationDirty:			DS.attr('boolean', {default:false}),

    anchorID:function(){
        return "#"+this.get('id');
    }.property('id'),

    didUpdate:function(){
        Bootstrap.NM.push('Save was successful!', 'success');
    },

    optionRelationIsDirty: DS.attr('boolean', {default:false}),

    recordDirty:function(){
        return this.get('optionRelationIsDirty') || this.get('isDirty');
    }.property('optionRelationIsDirty', 'isDirty')
});