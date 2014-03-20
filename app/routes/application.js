import NavMenuItem from 'appkit/models/nav-menu-item';

export default Ember.Route.extend({

    model: function(params){
        var leftNavModel = [];
        leftNavModel.pushObject(
            NavMenuItem.create({
                pageTitle: 'Dashboard',
                route: 'auth.index',
                routeSubNames: []
            })
        );

        leftNavModel.pushObject(
            NavMenuItem.create({
                pageTitle: 'Listing',
                route: 'list',
                routeSubNames: []
            })
        );

        leftNavModel.pushObject(
            NavMenuItem.create({
                pageTitle: 'Reporting',
                route: 'reports',
                routeSubNames: []
            })
        );

        leftNavModel.pushObject(
            NavMenuItem.create({
                pageTitle: 'Users',
                route: 'users.index',
                routeSubNames: ['users.page']
            })
        );

        leftNavModel.pushObject(
            NavMenuItem.create({
                pageTitle: 'System Options',
                route: 'options.index',
                routeSubNames: ['optionSubGroup']
            })
        );

        return leftNavModel;
    },
	
	setupController: function(controller, model){
	
//		var leftNavModel = [];
//			leftNavModel.pushObject(
//				Lrt.NavMenuItem.create({
//					pageTitle: 'Dashboard',
//					route: 'auth.index',
//					routeSubNames: []
//				})
//			);
//
//			leftNavModel.pushObject(
//				Lrt.NavMenuItem.create({
//					pageTitle: 'Listing',
//					route: 'requestListing',
//					routeSubNames: []
//				})
//			);
//
//			leftNavModel.pushObject(
//				Lrt.NavMenuItem.create({
//					pageTitle: 'Reporting',
//					route: 'reports',
//					routeSubNames: []
//				})
//			);
//
//			leftNavModel.pushObject(
//				Lrt.NavMenuItem.create({
//					pageTitle: 'Users',
//					route: 'users',
//					routeSubNames: []
//				})
//			);
//
//			leftNavModel.pushObject(
//				Lrt.NavMenuItem.create({
//					pageTitle: 'System Options',
//					route: 'options.index',
//					routeSubNames: ['optionSubGroup']
//				})
//			);
	
		controller.set('menuModel', {
				leftNav: model
			});
	},
	
	
	
	actions:{
		
		login: function(username, pass){
			
			var lc = this.controllerFor('login');
				lc.set('loginAttempted', true);
				
				var self = this;
			
			if( lc.get('isValid') )
			{
				lc.set('processingLogin', true);
				this.get('store').find('user', {cecID:username}).then( function(response){

					
					var account = response.get('content').get('firstObject');
					
					if( response.get('length') )
					{
						// MEANING WE HAVE AN ACCOUNT IN LRT
						if( account.get('active') )
						{

						//	if( location.href.indexOf('lsrtember') < 0 )
						//	{
								// NOW VALIDATE IT WITH CISCO
								Ember.run(function(){
									Ember.$.getJSON(
//                                                    "system/ldap.php",
                                                    window.apiHost + "/system/ldap.php",
													{
														action:				'loginUser',
														lsrt_user_id:		self.controllerFor('login').get("username"),
														lsrt_user_password:	escape(self.controllerFor('login').get("password")),
//                                                        testing: Lrt.testing
													},
													function(data, textStatus, jqXHR){
                                                        Ember.run(function(){
                                                            if( !data.success ){
                                                                    self.controllerFor('login').set('errorMessage', data.message);
                                                            }else{

                                                                localStorage.lrt_auth_token = "YUP";
                                                                localStorage.lrt_auth_user = account.get('id');
                                                                localStorage.lrt_auth_cec = account.get('cecID');

                                                                self.controllerFor('current-user').set("model", account);

                                                                self.controllerFor('login').set('errorMessage', null);

                                                                var returnTrans = self.controllerFor('login').get('transition');
                                                                if( returnTrans )
                                                                {
                                                                    returnTrans.retry();
                                                                }else{
                                                                    self.transitionTo('auth');
                                                                }
                                                            }
                                                            //console.log( data, self );
                                                        });
													},
                                                    function(){
                                                        //console.log("failed");
                                                    });
								});
												
						/*	}else{
								localStorage.lrt_auth_token = "YUP";
								localStorage.lrt_auth_user = account.get('id');
								localStorage.lrt_auth_cec = account.get('cecID');
								
								self.controllerFor('currentUser').set("model", account);
								
								self.controllerFor('login').set('errorMessage', null);
								
								var returnTrans = self.controllerFor('login').get('transition');
								if( returnTrans )
								{
									returnTrans.retry();
								}else{
									self.transitionTo('auth');
								}
							}*/
						}else{
							console.log("inactive");
						}
						
					}else{
						// MEANING NO ACCOUNT WAS FOUND IN LRT
						self.controllerFor('login').set('errorMessage', "You do not yet have an account in request tracker.");
					}
					
					self.controllerFor('login').setProperties({
																processingLogin: false,
																loginAttempted: false
																});
					
				}, function(response){
					self.controllerFor('login').set('errorMessage', response.message);
				}
				);
			}
			
			lc = null;
		},
		logout: function(){
			delete localStorage.lrt_auth_token;
			this.controllerFor('login').set('password', null);
			this.controllerFor('current-user').set('model', null);
			this.transitionTo('login');
		}
	}
	
	
});