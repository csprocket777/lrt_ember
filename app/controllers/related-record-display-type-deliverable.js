/**
 * Created by chshipma on 3/25/14.
 */
export default Ember.ArrayController.extend({
    recordType: null,
    model: function(){
        console.log(this.get('recordType'));
    }.property('recordType')
});