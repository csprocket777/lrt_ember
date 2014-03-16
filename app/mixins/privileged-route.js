/**
 * Created by chshipma on 11/19/13.
 */
var get = Ember.get, set = Ember.set;

export default Ember.Mixin.create({
    editPrivileges:null,
    viewPrivileges:null,
    createPrivileges:null,

    currentUserPrivileges: function(){
        return this.controllerFor('current-user').get('privileges');
    }.property('currentUser.privileges'),

    hasPrivilege:function(privID){
        return this.get('currentUserPrivileges') && this.get("currentUserPrivileges").findBy('id', privID) !== undefined;
    },

    currentUser:function(){
        return this.controllerFor('current-user');
    }.property('controller.current-users'),


    editAllowed:function(){
        var ret = false;

        if( this.get('editPrivileges') )
        {
            this.get('editPrivileges').forEach(function(priv){
                if( !ret )
                {
                    ret = this.get('currentUserPrivileges') && this.get("currentUserPrivileges").findBy('id', priv) !== undefined;
                }
            });
        }

        return ret;
    }.property('editPrivileges','currentUserPrivileges'),



    viewAllowed:function(){
        var ret = false;

        if( this.get('viewPrivileges') )
        {
            this.get('viewPrivileges').forEach(function(priv){
                if( !ret )
                {
                    ret = this.get('currentUserPrivileges') && this.get("currentUserPrivileges").findBy('id', priv) !== undefined;
                }
            });
        }

        return ret;
    }.property('viewPrivileges','currentUserPrivileges'),



    createAllowed:function(){
        var ret = false;

        if( this.get('createPrivileges') )
        {
            this.get('createPrivileges').forEach(function(priv){
                if( !ret )
                {
                    ret = this.get('currentUserPrivileges') && this.get("currentUserPrivileges").findBy('id', priv) !== undefined;
                }
            });
        }

        return ret;
    }.property('createPrivileges','currentUserPrivileges')
});