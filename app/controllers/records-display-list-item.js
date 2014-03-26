/**
 * Created by chshipma on 2/11/14.
 */
import PrivilegedController from 'appkit/mixins/privileged-controller';
export default Ember.ObjectController.extend(PrivilegedController, {
    needs:['users/index', 'current-user'],

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

    listView: function(){
        return this.get('model.record_form.views').findBy('view_type', 'list');
    }.property('model.record_form.views.@each.isLoaded')
});