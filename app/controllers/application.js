export default Ember.ObjectController.extend({
	needs:['current-user'],
	menuModel:null,
	userModel:function(){
		return this.get('controllers.current-user.model');
	}.property('controllers.current-user.model')
});