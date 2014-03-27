/**
 * Created by chshipma on 3/27/14.
 */
export default Ember.Component.extend({
    tagName: 'div',
//    classNames:['flip-container'],
    classNameBindings: ['labelType'],

    labelType: function(){
        var ret = "label";
        switch( this.get('model.type.id') )
        {
            case "108":
                ret += " label-primary";
                break;

            case "109":
                ret += " label-danger";
                break;

            case "201":
                ret += " label-default";
                break;
        }
        return ret;
    }.property('model.type.id'),

    didInsertElement: function(evt){
        this.$().find('[data-toggle="tooltip"]').tooltip();
    }

});