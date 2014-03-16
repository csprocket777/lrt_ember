/**
 * Created by chshipma on 11/15/13.
 */
export default DS.Model.extend({
    associated_privilege_id: DS.belongsTo('privilege', {default: null}),

    title:          DS.attr('string'),
    description:    DS.attr('string'),
    active:         DS.attr('boolean'),

    privileges:     DS.hasMany('privilege'),
    privilegesDirty:    DS.attr('boolean', {default:false}),
    associated_privilege_id_dirty:    DS.attr('boolean', {default:false}),

    orig_privileges: DS.hasMany('privilege'),
    orig_associated_privilege_id: DS.belongsTo('privilege'),

    anchorIDHash:function(){
        return "#"+this.get('id');
    }.property('id'),

    anchorID:function(){
        return this.get('id');
    }.property('id'),

    enabled: function(){
        return this.get('isAvailableToCurrentUser');
    }.property('isAvailableToCurrentUser')
});