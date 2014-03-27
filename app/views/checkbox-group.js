/**
 * Created by chshipma on 3/13/14.
 */
export default Ember.Checkbox.extend({
    checkedObserver: function(){
//        if( this.get('checked') ){
//            this.get('groupContainer').addObject( this.get('value') );
//        }else{
//            this.get('groupContainer').removeObject( this.get('value') );
//        }
    }.observes('checked')

});