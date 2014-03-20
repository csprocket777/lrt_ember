/**
 * Created by chshipma on 3/12/14.
 */
export default Ember.Component.extend({
    tagName: 'section',

    init: function(){
        var tag = "";
        switch( this.get('model.displayType') )
        {
            case "row":
            case "column":
                tag = 'section';
            break;

            case "divider":
                tag = "hr";
            break;
        }
        this.set('tagName', tag);
        this._super();
    },

    needsSmallDeleteButton: function(){
        return [
            "divider"
        ].contains(this.get('model.displayType'));
    }.property('model.displayType'),



    classNameBindings: ['scaffolding'],

    titleInEditMode: false,

    scaffolding: function(){
        var ret = "";

        switch(this.get('model.displayType'))
        {
            case "row":
                ret += " row";
                break;

            case "column":
                if( !Ember.isNone(this.get('parentModel')) )
                {
                    var columnCount = this.get('parentModel.child_definitions').filterBy('isColumn', true).get('length');
                    ret += " col col-md-"+( 12 / columnCount );
                }
                break;
        }

//            if( this.get('model.isRow') )
//            {
//                ret += " row";
//            }
//
//            if( this.get('model.isColumn') && !Ember.isNone(this.get('parentModel')) )
//            {
//                var columnCount = this.get('parentModel.child_definitions').filterBy('isColumn', true).get('length');
//                ret += " col col-md-"+( 12 / columnCount );
//            }

        return ret;
    }.property('model.isRow', 'model.isColumn', 'model.displayType'),

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
            var self = this;
            Ember.run.next(function(){
                self.$().find('.recordLayoutDefinitionTitle').focus();
            });
        },

        removeComponentTitle: function(){
            this.set('model.hasTitle', false);
            this.set('titleInEditMode', false);
        },

        editComponentTitle: function(){
            this.set('titleInEditMode', true);
            var self = this;
            Ember.run.next(function(){
                self.$().find('.recordLayoutDefinitionTitle').focus();
            });
        },

        changeOrderUp: function(evt, itemType){
            this.sendAction('changeOrderUpAction', evt, itemType);
        },

        changeOrderDown: function(evt, itemType){
            this.sendAction('changeOrderDownAction', evt, itemType);
        },

        addRecordFormElement: function(evtModel, elementType){
            this.sendAction('addRecordFormElementAction', evtModel, elementType);
        }
    }
});