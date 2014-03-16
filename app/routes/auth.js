export default Ember.Route.extend({
    errorReason: null,

	model: function(){
        var self = this;

		if( localStorage.lrt_auth_user ){
			return this.get('store').find('user', localStorage.lrt_auth_user);
//        .then(null, function(reason){
//                self.set('errorReason', reason);
//            });
		}
	},
	
	setupController: function(controller, model)
	{
		if( this.get('model') )
		{
			this.controllerFor('current-user').set('model', model);
			if( !sessionStorage.lrt_lastLogin_update_sent )
			{
				model.set('lastLoginTime', moment().format("YYYY-MM-DD HH:mm:ss"));
				model.save();
				sessionStorage.lrt_lastLogin_update_sent = true;
			}
		}
	},
	

	redirect: function(model, transition){
		
		// HERE WE'RE CHECKING TO SEE IF THERE'S A AUTHENTICATION TOKEN STORED IN LOCAL STORAGE. IF THERE ISN'T, WE'RE REDIRECTING TO THE LOGIN ROUTE
		if( !localStorage.lrt_auth_token){
			this.controllerFor('login').set('transition', transition);
			this.transitionTo('login');
		}
	},

//    actions:{
//        error: function(error, transition){
//            console.log("AUTH ROUTE: ",error, error.message);
//            this.controllerFor('error').set('errorCode', error.status);
////            this.transitionTo('error');
////            return false;
//        }
//    }
});