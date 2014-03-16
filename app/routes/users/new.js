/**
 * Created by chshipma on 10/16/13.
 */
//import Bootstrap from 'vendor/ember-addons.bs_for_ember/dist/js/bs-core.min.js';
import User from 'appkit/models/user';

var Bootstrap = window.Bootstrap;

export default Ember.Route.extend({

    storedTransition: null,
    isTransitioning:false,

    model: function(){
        return Ember.Object.createWithMixins(Ember.Copyable, {
            active: true,
            accessLevels: Ember.A([]),
            jobRole_ids: Ember.A([]),
            groupAssociation: Ember.A([]),
            jobRolesOriginal: Ember.A([]),
            orig_groupAssociation: Ember.A([]),
            extraPrivileges: Ember.A([]),
            orig_extraPrivileges: Ember.A([])
        });
    },

    setupController:function( controller, model )
    {
        controller.set('model', model);
        controller.set('userTypeOptions', this.get('store').find('userType', {active:true}));
        controller.set('jobRoleOptions', this.get('store').find('jobRole', {active:true}));
        controller.set('groupAssociations', this.get('store').find('groupAssociation', {active:true}));
        controller.set('devTeams', this.get('store').find('developmentTeam', {active:true}));


        controller.set('managers', this.get('store').find('user', {roleID: 288}) );
        controller.set('approvers', this.get('store').find('user', {roleID: 323}) );
        controller.set('availablePrivileges', this.get('store').find('privilege', {active:true}) );
        controller.set('availableAccessLevels', this.get('store').find('accessLevel', {active:true}) );

        this.get('store').find('accessLevel', {active:true}).then(function(result){

            controller.set('availableAccessLevels', result );
        });


        controller.set('privilegeGroups', this.get('store').find('privilegeGroup', {active:true}));
    },



    exitWhileNewUnsaved: function(){
        return Bootstrap.ModalManager.show('newUserConfirmExitModal');
    },

    deactivate: function(){

//        if( this.get('currentModel.isNew') )
//        {
//            this.get('currentModel').rollback();
//        }
//
//        //get('unfilteredModel').filterBy('isNew', true).invoke('rollback')
//
        this.setProperties({
            isTransitioning: false,
            storedTransition: null
        });
    },




    actions:{
        willTransition:function(transition)
        {
            if( !this.get('isTransitioning') )
            {
                var attributesToCheck = [
                    "name",
                    "cecID",
                    "approverID",
                    "developmentTeam",
                    "groupAssociation",
                    "managerID",
                    "type"
                ];

                this.set('storedTransition', transition);

                var allowTransition = true;
                attributesToCheck.forEach(function(val){
                    if( (this.controllerFor('users.new').get('model').get(val) ) && allowTransition )
                    {
                        allowTransition = false;
                    }
                }, this);

                if( !allowTransition )
                {
                    transition.abort();
                    this.exitWhileNewUnsaved();
                }
            }
        },

        confirmUnsavedExit:function(){
            var prevTrans = this.get('storedTransition');
            this.set('isTransitioning', true);
            prevTrans.retry();
        },

        cancelUnsavedExit: function(){

        },
        saveChanges:function(){
            var newUser = {},
                self = this;

            User.eachAttribute(function(name, meta){
                newUser[ name ] = self.get('currentModel').get(name);
            });

            var newUserResult = this.get('store').createRecord('user', newUser);
//            var newUserResult = this.get('store').createRecord('user', Ember.copy(this.get('currentModel')));

            User.eachRelationship(function(name, meta) {

                if( meta.kind === "hasMany" && this.get('currentModel').get(name) !== undefined && this.get('currentModel').get(name).get('length') > 0 )
                {
                    this.get('currentModel').get(name).forEach(function(item){
                        if( Ember.isNone( newUserResult.get(name) ) )
                        {
                            newUserResult.set(name, null);
                        }
                        if(!Ember.isNone(item))
                        {
                            newUserResult.get(name).pushObject(item);
                        }
                    }, this);
                }
            }, this);

            newUserResult.save().then(function(result){
                self.set('isTransitioning', true);
                self.transitionTo("user", result);
            });

        },

        revertChanges:function(){
            this.transitionTo("users");
        }
    },
    renderTemplate: function(){
        this.render('user',{ controller: "users.new"});
    }
});