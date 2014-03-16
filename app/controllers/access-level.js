import PrivilegedController from 'appkit/mixins/privileged-controller';

export default Ember.ObjectController.extend( PrivilegedController, {
    privilegeGroups: null,
    privileges: null,
    optionSubGroup: null,
    unsavedRecords: null,

    _setup:function(){
        this.set('unsavedRecords', []);
    }.on('init'),

    canModifyAccessLevels:function(){
        // 23 - Access Levels edit
        return this.hasPrivilege('23') || this.hasAccessLevel("1");
    }.property('currentUserPrivileges'),

    canViewAccessLevels:function(){
        // 22 - Access Levels edit
        return this.hasPrivilege('22') || this.hasAccessLevel("1");
    }.property('currentUserPrivileges'),

    actions:{
        privilegeChanged:function(data){
            if( data.switchData.value )
            {
                data.value.addObject( data.content );
            }else{
                data.value.removeObject( data.content );
            }

            this.set('model.privilegesDirty', !this.get('model.privileges.content').arrayColumn('id').compare( this.get('orig_privileges') ) );
        },

        back:function(){
            this.transitionToRoute('optionSubGroup', this.get('optionSubGroup.id'));
        }
    },

    saveNeeded: function(){
        return this.get('isDirty');
    }.property('isDirty')
});