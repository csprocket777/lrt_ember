/**
 * Created by chshipma on 11/19/13.
 */
var get = Ember.get, set = Ember.set;

export default Ember.Mixin.create({
    needs:['current-user'],
    editPrivileges:null,
    viewPrivileges:null,
    createPrivileges:null,

    currentUser:function(){
        return this.get('controllers.current-user');
    }.property('controllers.current-user'),

    currentUserPrivileges: function(){
        return this.get('controllers.current-user.privileges');
    }.property('controllers.current-user.privileges.@each'),

    currentUserAccessLevels: function(){
        return this.get('controllers.current-user.privileges');
    }.property('controllers.current-user.accessLevels.@each'),

    hasPrivilege:function(privID){
        return this.get('currentUserPrivileges') && this.get("currentUserPrivileges").findBy('id', privID) !== undefined;
    },

    hasAccessLevel:function(accessLevelID){
        return this.get('currentUserAccessLevels') && this.get("currentUserAccessLevels").findBy('id', accessLevelID) !== undefined;
    },

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

        return ret.length > 0 || this.hasAccessLevel("1");
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

        return ret.length > 0 || this.hasAccessLevel("1");
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

        return ret.length > 0 || this.hasAccessLevel("1");
    }.property('createPrivileges','currentUserPrivileges')
});