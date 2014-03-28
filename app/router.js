var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');
  // this.resource('posts', function() {
  //   this.route('new');
  // });

    this.resource('auth', { path: "/" }, function(){
        this.resource('loading');

        this.resource("list", function(){
            this.route('page', {path: "/page/:page_id"});
        });

        this.resource('record', {path: "/record/:record_id"}, function(){
            this.route('edit');
        });

        this.resource("reports");

        this.resource("users", function(){
            this.route("page", {path:"/page/:page_id"});
            this.route('new');
        });

        this.resource("user", {path:"/user/:user_id"});

        this.resource("options", function(){
            this.resource("optionSubGroup", {path: '/:option_sub_group_id'});
        });

        this.resource('accessLevel', {path: '/accessLevel/:access_level_id'});

        this.resource('accessLevelPermissionPrivilege', {path: '/accessLevelPermissionPrivilege/:access_level_id'});

//        this.resource("userProfile");
    });

    this.resource('login');
});

export default Router;
