/**
 * Created by chshipma on 10/16/13.
 */
import PrivilegedRoute from 'appkit/mixins/privileged-route';
export default Ember.Route.extend( PrivilegedRoute, {
    model: function(){
        return Ember.RSVP.hash({
            user: this.get('store').find('user'),
            group: this.get('store').find('groupAssociation'),
            jobRole: this.get('store').find('jobRole'),
            accessLevel: this.get('store').find('accessLevel')
        });
    },

    setupController:function( controller, model )
    {

        controller.setProperties({
            model:                  model.user,
            unfilteredModel:        model.user,
            groupFilterContent:     model.group,
            groupFilter:            this.controllerFor('current-user').get('groupAssociation.content').copy(),
            roleFilterContent:      model.jobRole,
            accessLevelContent:     model.accessLevel,
            selectedPage:           1
        });

//        controller.set('model', model.user);
//        controller.set('unfilteredModel', model.user);
//
//        controller.set('groupFilterContent', model.group);
//
//        controller.set('groupFilter', self.controllerFor('currentUser').get('groupAssociation.content').copy() );
//
//        controller.set('roleFilterContent', model.jobRole);
//        controller.set('accessLevelContent', model.accessLevel);

    }
});