import PrivilegedController from 'appkit/mixins/privileged-controller';

export default Ember.ObjectController.extend( PrivilegedController, {
    privilegeGroups: null,
    privileges: null,
    accessLevels: null,
    optionSubGroup: null,

    canModifyAccessLevels:function(){
        // 23 - Access Levels edit
        return this.hasPrivilege('23');
    }.property('currentUserPrivileges'),

    canViewAccessLevels:function(){
        // 22 - Access Levels edit
        return this.hasPrivilege('22');
    }.property('currentUserPrivileges'),

    actions:{
        radioValueChanged:function(data){
            var force = this.get("orig_associated_privilege_id");
            this.set('associated_privilege_id_dirty', this.get('associated_privilege_id') !== this.get('orig_associated_privilege_id') );
        },

        back:function(){
            this.transitionToRoute('optionSubGroup', this.get('optionSubGroup.id'));
        }
    },

    saveNeeded: function(){
        return this.get('isDirty');
    }.property('isDirty')
});