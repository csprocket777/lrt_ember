/**
 * Created by chshipma on 3/14/14.
 */

import recordFieldDisplayTypeBase from "appkit/components/record-field-display-type-base";

var Bootstrap = window.Bootstrap;
export default recordFieldDisplayTypeBase.extend({
    selectedPersonnel: null,

    _setup: function(){
        this.set('selectedPersonnel', []);
    }.on('init'),

    modalButtons: [
        Ember.Object.create({title:'Cancel', dismiss:'modal'}),
        Ember.Object.create({title:'Assign', clicked:"assignPersonnel", type:'primary'})
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
        },

        assignPersonnel: function(){
            console.log('NEED TO ASSIGN BACK TO RECORD VALUE', this.get('selectedPersonnel'));
            Bootstrap.ModalManager.hide(this.get('modalID'));
        }
    }
});