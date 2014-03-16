/**
 * Created by chshipma on 11/6/13.
 */
import PrivilegedRoute from 'appkit/mixins/privileged-route';
export default Ember.Route.extend( PrivilegedRoute, {
    model:function(params){
        return Ember.RSVP.hash({
            user:                   this.get('store').find('user', params.user_id),
            userTypeOptions:        this.get('store').find('userType', {active: true}),
            jobRoleOptions:         this.get('store').find('jobRole', {active:true}),
            groupAssociations:      this.get('store').find('groupAssociation', {active:true}),
            devTeams:               this.get('store').find('developmentTeam', {active:true}),
            managers:               this.get('store').find('user', {roleID: 288}),
            approvers:              this.get('store').find('user', {roleID: 323}),
            availablePrivileges:    this.get('store').find('privilege', {active:true}),
            privilegeGroups:        this.get('store').find('privilegeGroup', {active:true}),
            availableAccessLevels:  this.get('store').find('accessLevel', {active:true})
        });
    },

    setupController: function(controller, model)
    {
        controller.setProperties({
            model:                  model.user,
            userTypeOptions:        model.userTypeOptions,
            jobRoleOptions:         model.jobRoleOptions,
            groupAssociations:      model.groupAssociations,
            devTeams:               model.devTeams,
            managers:               model.managers,
            approvers:              model.approvers,
            availablePrivileges:    model.availablePrivileges,
            availableAccessLevels:  model.availableAccessLevels,
            privilegeGroups:        model.privilegeGroups
        });

        controller.set('jobRolesRollback', model.user.get('jobRole_ids.content').copy());
    },

    actions:{
        saveChanges:function(){
            this.controllerFor('user').set('model.saving', true);
            this.controllerFor('user').cleanUpUnnecessaryExtraPrivileges();
            this.controllerFor('user').get('model').save();
        },

        revertChanges:function(){
            var self = this.get('currentModel.user');
            this.get('currentModel.user').reload().then(function(){
                self.rollback();
            });
        }
    }
});