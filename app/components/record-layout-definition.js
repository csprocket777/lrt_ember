/**
 * Created by chshipma on 3/12/14.
 */
export default Ember.Component.extend({
    tagName: 'section',
    classNameBindings: ['scaffolding'],

    titleInEditMode: false,

    scaffolding: function(){
        var ret = "";

            if( this.get('model.isRow') )
            {
                ret += " row";
            }

            if( this.get('model.isColumn') && !Ember.isNone(this.get('parentModel')) )
            {
                var columnCount = this.get('parentModel.child_definitions').filterBy('isColumn', true).get('length');
                ret += " col col-md-"+( 12 / columnCount );
            }

        return ret;
    }.property('model.isRow', 'model.isColumn'),

    actions:{
        addRow: function(evt){
            this.sendAction("addRowAction", evt);
        },
        addColumn: function(evt){
            this.sendAction("addColumnAction", evt);
        },
        addField: function(evt){
            this.sendAction("addFieldAction", evt);
        },
        deleteItem: function(evt){
            this.sendAction("deleteAction", evt);
        },

        removeField: function(evt){
            this.sendAction("removeFieldAction", evt);
        },
        saveComponentChanges: function(){
            this.get('model').save();
            this.set('titleInEditMode', false);
        },

        addComponentTitle: function(){
            this.set('model.hasTitle', true);
            this.set('titleInEditMode', true);
        },

        removeComponentTitle: function(){
            this.set('model.hasTitle', false);
            this.set('titleInEditMode', false);
        },

        editComponentTitle: function(){
            this.set('titleInEditMode', true);
        },

        changeOrderUp: function(evt){
            this.sendAction('changeOrderUpAction', evt);
        },

        changeOrderDown: function(evt){
            this.sendAction('changeOrderDownAction', evt);
        }
    }
});