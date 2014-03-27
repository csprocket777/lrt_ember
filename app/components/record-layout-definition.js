/**
 * Created by chshipma on 3/12/14.
 */
export default Ember.Component.extend({
    tagName: 'section',

    layoutEditMode: false,

    init: function(){
        var tag = "";
        switch( this.get('model.displayType') )
        {
            case "row":
            case "column":
            case "tab-container":
                tag = 'section';
            break;

            case "divider":
                tag = "hr";
            break;
        }
        this.set('tagName', tag);
        this._super();
    },

    activeTab: null,

    activeTabInit: function(){
        if( this.get('model.displayType') === "tab-container" ){
            this.set('activeTab', this.get('model.child_definitions.firstObject'));
        }
    }.on('init'),

    needsSmallDeleteButton: function(){
        return [
            "divider"
        ].contains(this.get('model.displayType'));
    }.property('model.displayType'),

    recordValueModel: null,

    classNameBindings: ['scaffolding'],

    titleInEditMode: false,
    messageInEditMode: false,

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

    didInsertElement: function(evt){
        this.$().find('[data-toggle="tooltip"]').tooltip();
    },

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
        saveComponentChanges: function(evtModel){
            evtModel.save();
//            this.get('model').save();
            this.setProperties({
                titleInEditMode:false,
                messageInEditMode: false
            });
        },

        addComponentTitle: function(){
            this.set('model.hasTitle', true);
            this.set('titleInEditMode', true);
            var self = this;
            Ember.run.next(function(){
                self.$().find('.recordLayoutDefinitionTitle').focus();
            });
        },

        addComponentMessage: function(){
            this.set('model.hasMessage', true);
            this.set('messageInEditMode', true);
            var self = this;
            Ember.run.next(function(){
                self.$().find('.recordLayoutMessageText').focus();
            });
        },

        removeComponentTitle: function(){
            this.set('model.hasTitle', false);
            this.set('titleInEditMode', false);
            this.get('model').save();
        },

        removeComponentMessage: function(){
            this.set('model.hasMessage', false);
            this.set('messageInEditMode', false);
            this.get('model').save();
        },

        editComponentTitle: function(){
            this.set('titleInEditMode', true);
            var self = this;
            Ember.run.next(function(){
                self.$().find('.recordLayoutMessageText').focus();
            });
        },

        editComponentMessage: function(){
            this.set('messageInEditMode', true);
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