/**
 * Created by chshipma on 11/13/13.
 */
export default DS.Model.extend({
    title:              DS.attr('string'),
    description:        DS.attr('string'),
    active:             DS.attr('boolean'),
    updated_at:         DS.attr('date'),
    created_at:         DS.attr('date'),

    privileges:         DS.hasMany('privilege', {inverse:'privilegeGroups', async:true}),
    orig_privileges:    DS.attr(),

    anchorIDHash:function(){
        return "#"+this.get('id');
    }.property('id'),

    anchorID:function(){
        return this.get('id');
    }.property('id'),

    privilegeCount: function(){
        return this.get('privileges.length');
    }.property('privileges.@each')
});