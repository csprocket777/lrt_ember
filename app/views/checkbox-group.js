/**
 * Created by chshipma on 3/13/14.
 */
export default Ember.Checkbox.extend({
    checkedObserver: function(){
        if( this.get('checked') )
        {
            if( this.get('groupContainer').contains( this.get('value.content') ) === false ){
                this.get('groupContainer').addObject( this.get('value.content') );
            }
        }else{
            this.get('groupContainer').removeObject( this.get('value.content') );
        }
    }.observes('checked')

});