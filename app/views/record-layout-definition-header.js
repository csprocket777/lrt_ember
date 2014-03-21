/**
 * Created by chshipma on 3/21/14.
 */
export default Ember.View.extend({
    tagName: "h3",
    nestDepth: 0,

    tagObserver: function(){
        if( this.get('controller.model.record_layout_definition') )
        {
            this.detectNestDepth( this.get('controller.model.record_layout_definition') );
        }

        switch( this.get('nestDepth') )
        {
            case 1:
                this.set('tagName', 'h4');
                break;
            case 2:
                this.set('tagName', 'h5');
                break;
            case 3:
                this.set('tagName', 'h6');
                break;
        }
    }.on('init'),

    detectNestDepth: function(curParent){
        if( curParent.get('record_layout_definition'))
        {
            if( curParent.get("displayType") === "row" )
            {
                this.incrementProperty('nestDepth');
            }
            this.detectNestDepth(curParent.get('record_layout_definition'));
        }
    }
});