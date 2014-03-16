/**
 * Created by chshipma on 11/6/13.
 */

import PrivilegedController from 'appkit/mixins/privileged-controller';
export default Ember.ObjectController.extend( PrivilegedController, {
    needs:['current-user'],
    userTypeOptions:null,
    groupAssociations:null,
    devTeams:null,
    managers:null,
    approvers:null,
    availablePrivileges:null,
    availableAccessLevels:null,
    privilegeGroups: null,


    jobRoleOptions:null,
    jobRolesRollback:null,

    isOwnRecord:function(){
        return this.get('model') === this.get('currentUser.content');
    }.property('model', 'currentUser.content'),



//    extraPrivilegeModalButtons: [
//        {title:'Add to account', clicked:"addExtraPrivilegesToAccount", dismiss:'modal', type:"primary"},
//        {title:'Cancel', clicked:'cancelExtraPrivilegesToAccount', dismiss:'modal'}
//    ],
//

    canEditAllUsers:function(){
        var propID = "8"; // Personnel Manage - Edit All
        return (( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege(propID) ) || (this.get('isOwnRecord') && this.hasPrivilege(propID) && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),


    canViewAllUsers:function(){
        var propID = "7"; // Personnel Manage - View All
        return (( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege(propID) ) || (this.get('isOwnRecord') && this.hasPrivilege(propID) && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),

    canViewOwnGroupUsers:function(){
        var propID = "10"; // Personnel Manage - View Own Group
        return (( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege(propID) ) || (this.get('isOwnRecord') && this.hasPrivilege(propID) && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),

    canEditOwnGroupUsers:function(){
        var propID = "11"; // Personnel Manage - Edit Edit Own Group
        return (( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege(propID) ) || (this.get('isOwnRecord') && this.hasPrivilege(propID) && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),

    canEditUser: function(){
        if( this.get('canEditAllUsers') )
        {
            return true;
        }

        var ret = false;

        if( this.get('canEditOwnGroupUsers') ){
            ret = this.get('controllers.current-user.groupAssociation.content').any(function(ga, index, enumerable){
                return this.get('model.groupAssociation.content').contains(ga);
            }, this);
        }

        return ret;
    }.property('canEditAllUsers','canEditOwnGroupUsers', 'currentUserPrivileges'),

    canViewUser: function(){
        if( this.get('canViewAllUsers') )
        {
            return true;
        }

        var ret = false;

        if( this.get('canViewOwnGroupUsers') ){
            ret = this.get('controllers.current-user.groupAssociation.content').any(function(ga, index, enumerable){
                return this.get('model.groupAssociation.content').contains(ga);
            }, this);
        }

        return ret;
    }.property('canViewAllUsers','canViewOwnGroupUsers', 'currentUserPrivileges'),





    canModifyAccessLevels:function(){
        // 18 - User Attribute edit - all
        // 17 - User Attribute edit - group
        // 16 - User Attribute edit - self
        // 6 - Access level edit
        var ret = ( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege('6') ) || (this.get('isOwnRecord') && this.hasPrivilege('6') && this.hasPrivilege('16') );

        // 25 : Can apply administrative access level
        // Access Level 1

        return ret;
    }.property('currentUserPrivileges'),


    canAssignExtraPrivileges:function(){
        var propID = "26";
        // As this is toggling the disabled of a select, we must return the inverse
        return !(( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege(propID) ) || (this.get('isOwnRecord') && this.hasPrivilege(propID) && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),


    canModifyGroupAssociation:function(){
        // As this is toggling the disabled of a select, we must return the inverse
        return !(( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege('12') ) || (this.get('isOwnRecord') && this.hasPrivilege('12') && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),


    canModifyDevelopmentGroupAssociation:function(){
        // As this is toggling the disabled of a select, we must return the inverse
        return !(( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege('15') ) || (this.get('isOwnRecord') && this.hasPrivilege('15') && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),


    canModifyManagerAssignment:function(){
        // As this is toggling the disabled of a select, we must return the inverse
        return !(( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege('14') ) || (this.get('isOwnRecord') && this.hasPrivilege('14') && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),


    canModifyApproverAssignment:function(){
        // As this is toggling the disabled of a select, we must return the inverse
        return !(( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege('13') ) || (this.get('isOwnRecord') && this.hasPrivilege('13') && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),


    canModifyActiveProperty:function(){
        var propID = "20";
        // As this is toggling the disabled of a select, we must return the inverse
        return ( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege(propID) ) || (this.get('isOwnRecord') && this.hasPrivilege(propID) && this.hasPrivilege('16') );
    }.property('currentUserPrivileges'),


    canModifyEmployeeTypeProperty:function(){
        var propID = "21";
        // As this is toggling the disabled of a select, we must return the inverse
        return !(( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege(propID) ) || (this.get('isOwnRecord') && this.hasPrivilege(propID) && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),


    canModifyJobRoleProperty:function(){
        var propID = "19";
        // As this is toggling the disabled of a select, we must return the inverse
        return !(( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege(propID) ) || (this.get('isOwnRecord') && this.hasPrivilege(propID) && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),


    canToggleAdministratorAccessLevel:function(){
        var propID = "25"; // Administrator access level toggle permission
        // As this is toggling the disabled of a select, we must return the inverse
        return !(( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege(propID) ) || (this.get('isOwnRecord') && this.hasPrivilege(propID) && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),





    /* WATCHERS */
//    groupAssociationDirtyWatcher:function(){
//        if( this.get('saving') === false )
//        {
//            if( this.get('orig_groupAssociation') )
//            {
//                this.set('groupAssociationDirty', this.get('groupAssociation.content').compare(this.get('orig_groupAssociation.content')) === false );
//                console.log( this.get('groupAssociationDirty') );
//    //            this.set('model.groupAssociationDirty', this.get('model.groupAssociation') !== this.get('orig_groupAssociation'));
//            }else if( this.get('orig_groupAssociation') === null ){
//                this.set('model.groupAssociationDirty', this.get('model.groupAssociation') !== null );
//            }
//        }
//    }.observes("groupAssociation.@each", "orig_groupAssociation.@each"), //, "orig_groupAssociation", "orig_groupAssociation.@each"),

    typeDirtyWatcher:function(){
        if( this.get('saving') === false )
        {
            if( this.get('orig_type') )
            {
                this.set('model.typeDirty', this.get('model.type') !== this.get('orig_type'));
            }else if( this.get('orig_type') === null ){
                this.set('model.typeDirty', this.get('model.type') !== null );
            }
        }
    }.observes("type"),

    managerDirtyWatcher:function(){
        if( this.get('saving') === false )
        {
            if( this.get('orig_managerID') )
            {
                this.set('model.managerIDDirty', this.get('model.managerID') !== this.get('orig_managerID'));
            }else if( this.get('orig_managerID') === null ){
            this.set('model.managerIDDirty', this.get('model.managerID') !== null );
        }
        }
    }.observes("managerID"),

//    devTeamDirtyWatcher:function(){
//        if( this.get('saving') === false )
//        {
//            if( this.get('orig_developmentTeam') )
//            {
//            this.set('model.developmentTeamDirty', this.get('model.developmentTeam') !== this.get('orig_developmentTeam'));
//        }else if( this.get('orig_developmentTeam') === null ){
//            this.set('model.developmentTeamDirty', this.get('model.developmentTeam') !== null );
//        }
//        }
//    }.observes("developmentTeam"),

    approverDirtyWatcher:function(){
        if( this.get('saving') === false )
        {
//            if( this.get('orig_approverID') )
//            {
//                this.set('model.approverIDDirty', this.get('model.approverID') !== this.get('orig_approverID'));
//            }else if( this.get('orig_approverID') === null ){
//                this.set('model.approverIDDirty', this.get('model.approverID') !== null );
//            }
        }
    }.observes("approverID"),



    saveNeeded:function(){
        return this.get('isDirty');
    }.property('isDirty'),


    cleanUpUnnecessaryExtraPrivileges: function(){
        var self = this;

        this.get('extraPrivileges').forEach(function(ep){
            if( self.get('accessLevelPrivileges').contains(ep) ){
                self.get('extraPrivileges').removeObject(ep);
            }
        });
    },



/* ACTIONS */
    actions:{
//        showAddPrivilegesModal:function(){
//            Bootstrap.ModalManager.show('addSpecificPrivilegeModal');
//        },
//
//        addExtraPrivilegesToAccount: function(evt){
//            console.log("adding extra privileges", evt);
//        },
//
//        cancelExtraPrivilegesToAccount: function(evt){
//            console.log("cancelling extra privileges", evt);
//        },

        resetAllExtraPrivileges: function(){
            while( this.get('model.extraPrivileges.length') > 0 )
            {
                this.get('model.extraPrivileges').removeObject( this.get('model.extraPrivileges.lastObject') );
            }
        },

        relationshipSelectChanged:function(data)
        {
//            data.modelToManage.set( data.propToTriggerAsDirty , data.newValue.length !== data.originalValue.length );
//            data.modelToManage.set( data.propToTriggerAsDirty , data.newValue.compareEmber( data.originalValue ) === false );
            data.modelToManage.set( data.propToTriggerAsDirty , Ember.compare( data.newValue, data.originalValue ) !== 0 );
        },

        accessLevelChanged: function(data)
        {
            if( data.switchData.value )
            {
                data.value.addObject( data.content );
            }else{
                data.value.removeObject( data.content );
            }

            this.set('model.accessLevelsDirty', !this.get('model.accessLevels.content').arrayColumn('id').compare( this.get('orig_accessLevels') ) );
        },

        extraPrivilegeChanged: function(data)
        {
//            var ep = this.get('model.extraPrivileges');

            if( data.switchData.value )
            {
                this.get('model.extraPrivileges').addObject( data.content );
            }else{
                this.get('model.extraPrivileges').removeObject( data.content );
            }

            this.set('model.extraPrivilegesDirty', !this.get('model.extraPrivileges.content').arrayColumn('id').compare( this.get('orig_extraPrivileges') ) );
        }
    }
});