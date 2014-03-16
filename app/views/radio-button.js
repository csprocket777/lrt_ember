/**
 * Created by chshipma on 2/7/14.
 */
export default Ember.View.extend({
    tagName : "input",
    type : "radio",
    model: null,
    prop: null,
    valueStorage: null,
    destValueStorage: null,
    attributeBindings : [ "name", "type", "value", "checked:checked:" ],
    click : function() {
        this.get('model').set( this.get('prop'), this.get('destValueStorage') );
        this.get('controller').send('radioValueChanged', this.get('destValueStorage'));
    },
    checked : function() {
        return this.get( 'model').get( this.get('prop'))  === this.get("destValueStorage");
    }.property('selection')
});