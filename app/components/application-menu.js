export default Ember.Component.extend({
    tagName: "nav",
    classNames:['navbar', 'navbar-default', 'navbar-fixed-top'],
    attributeBindings: ['id', 'role'],

    id: 'lrt_nav',
    role: 'navigation',

	actions:{
		logout:function(action){
			this.sendAction("logoutAction");
		}
	}
});