/**
 * Created by chshipma on 2/10/14.
 */
export default Ember.ObjectController.extend({
    needs:['user'],
    userModel: null,

//    privilegeIsInAccessLevel: function(){
//        var ret = false,
//            self = this;
//
//        this.get('controllers.user.model.accessLevels').forEach(function(al){
//            if( al.get('privileges').contains( self.get('model') ) && !ret )
//            {
//                ret = true;
//            }
//        });
//
//        return ret;
//    }.property('controllers.user.model.accessLevels.privileges.@each', 'controllers.user.model.accessLevels.@each'),

    privilegeIsInAccessLevel: function(){
        var ret = false,
            self = this;

        this.get('parentController.model.accessLevels').forEach(function(al){
            if( al.get('privileges').contains( self.get('model') ) && !ret )
            {
                ret = true;
            }
        });

        return ret;
    }.property('parentController.model.accessLevels.privileges.@each', 'parentController.model.accessLevels.@each')
});