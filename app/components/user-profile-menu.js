export default Ember.Component.extend({
	tagName:'li',
	classNames:['dropdown'],
	
	actions:{
		logout:function(){
			this.sendAction('logoutAction');
		},

        reloadAccount:function(){
            this.get('model').reload();
            this.get('privileges');
        }
	}
});