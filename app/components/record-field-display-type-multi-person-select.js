/**
 * Created by chshipma on 3/14/14.
 */

import recordFieldDisplayTypeBase from "appkit/components/record-field-display-type-base";

var Bootstrap = window.Bootstrap;
export default recordFieldDisplayTypeBase.extend({

    modalButtons: [
        Ember.Object.create({title:'Delete All', clicked:"confirmFieldAssociationDeletion", type:'danger'}),
        Ember.Object.create({title:'Cancel', dismiss:'modal'})
    ],

    modalTitle: function(){
        return "Assign people for: "+this.get('model.label');
    }.property('model.label'),

    modalID: function(){
        return this.get('elementId')+"_modal";
    }.property('elementId'),

    actions:{
        showUserSelectModal: function(){
            Bootstrap.ModalManager.show(this.get('modalID'));
        }
    }
});