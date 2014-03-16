/**
 * Created by chshipma on 2/10/14.
 */
export default Ember.ObjectController.extend({
    needs:['current-user'],

    canAssignAccessLevel: function(){
        //25 - privilege ID we're looking for, "can assign administrator access level"

//        return this.get('controllers.currentUser.accessLevelPrivileges').findBy('id', 25) || this.get('controllers.currentUser.extraPrivileges').findBy('id', 25);
        return this.get('controllers.current-user.accessLevels').findBy('id', this.get('id') );
    }.property('controllers.current-user.accessLevels.@each', 'controllers.current-user.accessLevelPrivileges.@each', 'controllers.current-user.extraPrivileges.@each')
});