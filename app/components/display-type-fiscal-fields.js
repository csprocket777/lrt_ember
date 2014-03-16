export default Ember.Component.extend({
    layoutName: "display-type-fiscal-fields",

    didInsertElement:function(){
        if( this.$('.datepickerfld').length && this.get('canEdit') ){
            this.$('.datepickerfld').datepicker({
                format: "yyyy-mm-dd"
            });
        }
    },

    actions:{
        addNew:function(evtData){
            this.sendAction("newAction", evtData);

            Ember.run.next(this, function(){
                $('tr.warning:last input.endDate').focus();
            });
        },

        cancelNew: function(evtData){
            this.sendAction("cancelAction", evtData);
//            this.get('providedStore').deleteRecord(obj);
//            this.get('optionsController.unsavedRecords').removeObject(obj);
        }
    },
});