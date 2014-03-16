export default Ember.ObjectController.extend({
	active:function(){
        return this.get('model') === this.get('parentController.active');
	}.property('parentController.active'),

    actions:{
        tabClick:function(){
            this.set('parentController.active', this.get('model'));
        }
    }
});