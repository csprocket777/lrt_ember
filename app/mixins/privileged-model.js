/**
 * Created by chshipma on 2/7/14.
 */
export default Ember.Mixin.create({
    isAvailableToCurrentUser: function(){

        return false;
    }.property()
});