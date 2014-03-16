/**
 * Created by chshipma on 10/7/13.
 */
export default Ember.Component.extend({
    layoutName: "display-type-access-level-fields",
    actions:{
//        addNew:function(){
//            this.get('providedModel.content.store').createRecord( this.get('subGroupModel.modelName') ,{
//                active: true
//            });
//
//            Ember.run.next(this, function(){
//                $('tr.warning:last input:first').focus();
//            });
//        }

        addNew:function(evtData, contextData){
            this.sendAction("newAction", evtData, contextData);
            Ember.run.next(this, function(){
                $('tr.warning:last input:first').focus();
            });
        },

        cancelNew: function(evtData, context){
            this.sendAction('cancelAction', evtData, context);
        }
    },
});