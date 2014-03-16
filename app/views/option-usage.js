export default Ember.View.extend({
    templateName: "optionUsage",
    fooTest: function(){
        return this.get('store').find('option');
    }.property('store')
});