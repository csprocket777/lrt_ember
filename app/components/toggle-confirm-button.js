/**
 * Created by chshipma on 4/1/14.
 */
export default Ember.Component.extend({
    toggled: false,

    actions:{
        toggleConfirm: function(){
            this.toggleProperty('toggled');
        },

        confirmAction: function(){
            this.toggleProperty('toggled');
            this.sendAction('confirmAction');
        },

        cancelAction: function(){
            this.toggleProperty('toggled');
        }
    }
});