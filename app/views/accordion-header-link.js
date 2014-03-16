/**
 * Created by chshipma on 3/11/14.
 */
export default Ember.View.extend({
    tagName: 'a',
    attributeBindings:['href', 'dataParent:data-parent', 'dataToggle:data-toggle'],

    dataParent: function(){
        return this.get('dataParent');
    }.property('dataParent'),

    dataToggle: function(){
        return this.get('dataToggle');
    }.property('dataToggle')
});