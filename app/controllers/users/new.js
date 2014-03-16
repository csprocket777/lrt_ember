/**
 * Created by chshipma on 11/22/13.
 */
//import Bootstrap from 'vendor/ember-addons.bs_for_ember/dist/js/bs-core.min.js';
import PrivilegedController from 'appkit/mixins/privileged-controller';

var Bootstrap = window.Bootstrap;
export default Ember.ObjectController.extend( PrivilegedController, {
    needs:["application"],

    isNew: true,

    userTypeOptions:null,
    groupAssociations:null,
    devTeams:null,
    managers:null,
    approvers:null,
    availablePrivileges:null,
    availableAccessLevels:null,


    jobRoleOptions:null,
    jobRolesRollback:null,


    recordDetailsLookupCounter: 0,
    recordDetailsData:[],

    canViewUser: function(){
        return this.hasAccessLevel("1") || this.hasAccessLevel("2");
    }.property('currentUserAccessLevels'),

    canEditUser: function(){
        return this.hasAccessLevel("1") || this.hasAccessLevel("2");
    }.property('currentUserAccessLevels'),


    canModifyAccessLevels:function(){
        // 18 - User Attribute edit - all
        // 17 - User Attribute edit - group
        // 16 - User Attribute edit - self
        // 6 - Access level edit
        return ( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege('6') ) || (this.get('isOwnRecord') && this.hasPrivilege('6') && this.hasPrivilege('16') );
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





    /* WATCHERS */
//    groupAssociationDirtyWatcher:function(){
//        if( !this.get('model.isDeleted') )
//        {
//            if( this.get('orig_groupAssociation') )
//            {
//                this.set('groupAssociationDirty', this.get('groupAssociation.content').compare(this.get('orig_groupAssociation.content')) === false );
//    //            this.set('model.groupAssociationDirty', this.get('model.groupAssociation') !== this.get('orig_groupAssociation'));
//            }else if( this.get('orig_groupAssociation') === null ){
//                this.set('model.groupAssociationDirty', this.get('model.groupAssociation') !== null );
//            }
//        }
//    }.observes("groupAssociation"),
//
//    typeDirtyWatcher:function(){
//        if( !this.get('model.isDeleted') )
//        {
//            if( this.get('orig_type') )
//            {
//                this.set('model.typeDirty', this.get('model.type') !== this.get('orig_type'));
//            }else if( this.get('orig_type') === null ){
//                this.set('model.typeDirty', this.get('model.type') !== null );
//            }
//        }
//    }.observes("type"),
//
//    managerDirtyWatcher:function(){
//        if( !this.get('model.isDeleted') )
//        {
//            if( this.get('orig_managerID') )
//            {
//                this.set('model.managerIDDirty', this.get('model.managerID') !== this.get('orig_managerID'));
//            }else if( this.get('orig_managerID') === null ){
//                this.set('model.managerIDDirty', this.get('model.managerID') !== null );
//            }
//        }
//    }.observes("managerID"),
//
//    devTeamDirtyWatcher:function(){
//        if( !this.get('model.isDeleted') )
//        {
//            if( this.get('orig_developmentTeam') )
//            {
//                this.set('model.developmentTeamDirty', this.get('model.developmentTeam') !== this.get('orig_developmentTeam'));
//            }else if( this.get('orig_developmentTeam') === null ){
//                this.set('model.developmentTeamDirty', this.get('model.developmentTeam') !== null );
//            }
//        }
//    }.observes("developmentTeam"),
//
//    approverDirtyWatcher:function(){
//        if( !this.get('model.isDeleted') )
//        {
//            if( this.get('orig_approverID') )
//            {
//                this.set('model.approverIDDirty', this.get('model.approverID') !== this.get('orig_approverID'));
//            }else if( this.get('orig_approverID') === null ){
//                this.set('model.approverIDDirty', this.get('model.approverID') !== null );
//            }
//        }
//    }.observes("approverID"),


    cecValid:false,

    recordValid:function(){
        return !this.get('model.isDeleted') && this.get('cecValid');
    }.property('cecValid'),


    saveNeeded:function(){
        return !this.get('model.isDeleted') && this.get('isDirty');
    }.property('isDirty'),


    ldapResult:null,

    confirmExitModalButtons: [
        {title:'Yes, Exit', clicked:"confirmUnsavedExit"},
        {title:'No, stay', clicked:'cancelUnsavedExit', dismiss:'modal', type:'primary'}
    ],


    ldapProcessor: function(){
        if( !this.get('model.isDeleted') )
        {
            var lr = this.get('ldapResult');

            var employeeType = lr.info[0].employeetype[0] === "Regular" ? this.get('store').find('userType', 108):this.get('store').find('userType', 109);

            var tmpThis = this;

            Ember.RSVP.all([ lr, employeeType ]).then(function(data){
//                console.log(data, tmpThis);

                tmpThis.get('model').setProperties({
                    name            : data[0].info[0].givenname[0] + " " + data[0].info[0].sn[0],
                    type            : data[1],
                    user_AD_DEPT    : data[0].info[0].department[0],
                    user_AD_ID      : data[0].info[0].employeeid[0],
                    user_AD_DN      : data[0].info[0].dn,
                    manager_AD_ID   : data[0].info[0].manager[0]
                });
            });
        }

    }.observes('ldapResult'),


    actions:{

        resetAllExtraPrivileges: function(){
            while( this.get('model.extraPrivileges.length') > 0 )
            {
                this.get('model.extraPrivileges').removeObject( this.get('model.extraPrivileges.lastObject') );
            }
        },

        relationshipSelectChanged:function(data)
        {
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
//
//            this.set('model.accessLevelsDirty', !this.get('model.accessLevels.content').arrayColumn('id').compare( this.get('orig_accessLevels') ) );
        },

        extraPrivilegeChanged: function(data)
        {
            if( data.switchData.value )
            {
                this.get('model.extraPrivileges').addObject( data.content );
            }else{
                this.get('model.extraPrivileges').removeObject( data.content );
            }
//
//            this.set('model.extraPrivilegesDirty', !this.get('model.extraPrivileges.content').arrayColumn('id').compare( this.get('orig_extraPrivileges') ) );
        },

        lookupCECID: function(){
            /*
            displayname / description / gecos / givenname + sn
            employeetype
            mail / name / samaccountname
            manager

             */

            var self = this;
            $('#cecid').parent().parent().removeClass('has-error');
            // NOW LOOKUP THE CEC ID IN ACTIVE DIRECTORY
            Ember.run(function(){
                var existingUser = self.get('store').find('user',{cecID:self.get('cecID')});

                Ember.RSVP.all([existingUser]).then(function(userResult){

                    if( userResult[0].get('content.length') === 0 )
                    {
                        Ember.$.getJSON(
                            "/system/ldap.php",
                            {
                                action: 'lookupUser',
                                cecid:  self.get("cecID")
                            },
                            function(data, textStatus, jqXHR){
                                Ember.run(function(){
//                                        console.log( data );

                                    if( !data.success ){
//                                        console.log(data.message);
                                        Bootstrap.NM.push('Can not find user in Cisco Directory!', 'info');
                                        $('#cecid').parent().parent().addClass('has-error');
                                        self.set('cecValid', false);
                                    }else{
                                        Bootstrap.NM.push('This is a valid user! Information from the directory has been applied.', 'success');

                                        self.set('cecValid', true);
                                        self.set('ldapResult', data);
                                    }

                                });
                            },
                            function(){
//                                console.log("failed");
                            });
                    }else{
                        Bootstrap.NM.push('User already exists!', 'danger');
                        $('#cecid').parent().parent().addClass('has-error');
                        self.set('cecValid', false);
                    }
                });
            });
        }
    }
});