/**
 * Created by chshipma on 3/25/14.
 */
export default Ember.View.extend({
    templateName: "related-record-view",
    tagName: 'section',
    classNames: ['related-record-view'],
    classNameBindings: ['scaffolding'],

    titleInEditMode: false,

    scaffolding: function(){
        var ret = "";
        if( !Ember.isNone(this.get('parentModel')) )
        {
            var columnCount = this.get('parentModel.child_definitions').filterBy('isColumn', true).get('length');
            ret += " col col-md-"+( 12 / columnCount );
        }

        return ret;
    }.property('model.isRow', 'model.isColumn', 'model.displayType'),
});