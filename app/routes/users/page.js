/**
 * Created by chshipma on 10/16/13.
 */
export default Ember.Route.extend({
    pageID: null,

   model: function(params){
       this.set('pageID', params.page_id);

       if( this.controllerFor('users.index').get('model.length') === 0 )
       {
           return Ember.RSVP.hash({
               user: this.get('store').find('user'),
               group: this.get('store').find('groupAssociation'),
               jobRole: this.get('store').find('jobRole'),
               accessLevel: this.get('store').find('accessLevel')
           });
       }else{
           return Ember.RSVP.hash({
               user: this.controllerFor('users.index').get('unfilteredModel'),
               group: this.controllerFor('users.index').get('groupFilterContent'),
               jobRole: this.controllerFor('users.index').get('roleFilterContent'),
               accessLevel: this.controllerFor('users.index').get('accessLevelContent')
           });
       }
   },
   setupController: function(controller, model){
       this.controllerFor('users.index').setProperties({
           model:                  model.user,
           unfilteredModel:        model.user,
           groupFilterContent:     model.group,
           groupFilter:            this.controllerFor('current-user').get('groupAssociation.content').copy(),
           roleFilterContent:      model.jobRole,
           accessLevelContent:     model.accessLevel,
           selectedPage:           this.get('pageID')
       });
   },
   renderTemplate: function(){
       this.render('users.index', { controller:'users.index' });
   }
});