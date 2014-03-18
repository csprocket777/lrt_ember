/**
 * Created by chshipma on 3/18/14.
 */
export default Ember.ObjectController.extend({
    label: function(){
        return this.get( this.get('parentController.labelKey') );
    }.property('parentController.labelKey', 'model', 'content')
});