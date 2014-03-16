/**
 * Created by chshipma on 11/11/13.
 */
export default DS.Model.extend({
    title:          DS.attr('string'),
    description:    DS.attr('string'),
    active:         DS.attr('boolean'),

    privilegeGroups: DS.hasMany('privilegeGroup', {inverse: 'privileges'}),

    group:  DS.belongsTo('privilegeGroup'),

    anchorIDHash:function(){
        return "#"+this.get('id');
    }.property('id'),

    anchorID:function(){
        return this.get('id');
    }.property('id'),

    mainPrivilegeGroup: function(){
        return this.get('privilegeGroups.firstObject');
    }.property('privilegeGroups')
});