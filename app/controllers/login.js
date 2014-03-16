export default Ember.Controller.extend(Ember.Validations.Mixin,{
	needs:['current-user','application'],
	errorMessage:null,
	username: function(){
		return localStorage.lrt_auth_cec;
	}.property(),
	
	loginAttempted:false,
	
	showUsernameLoginErrors: function(){
		return this.get('loginAttempted') && this.get('errors.username.length') > 0;
	}.property('loginAttempted'),
	
	showPasswordLoginErrors: function(){
		return this.get('loginAttempted') && this.get('errors.password.length') > 0;
	}.property('loginAttempted'),
	
	validations: {
		username: {
			length: { 
				minimum: 3,
				messages: {
					tooShort: "Username is your CEC ID without the '@cisco.com'"
					}
				}
		},
		password: {
			length: { 
				minimum: 3,
				messages: {
					tooShort: "Password is your CEC password"
					}
				}
		}
	}
});