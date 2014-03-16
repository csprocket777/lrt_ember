export default Ember.Component.extend({
	actions:{
		logout:function(action){
			this.sendAction("logoutAction");
		}
	}
});