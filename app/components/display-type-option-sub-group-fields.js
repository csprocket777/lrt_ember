/**
 * Created by chshipma on 10/8/13.
 */
export default Ember.Component.extend({
    layoutName: "display-type-option-sub-group-fields",

   actions:{
       relationshipSelectChanged:function(data)
       {
           data.modelToManage.set( data.propToTriggerAsDirty , data.newValue !== data.originalValue);
       },
//       addNew:function()
//       {
//           switch( this.get('providedModel.modelName') )
//           {
//               case "option":
//                   this.get('providedModel.store').createRecord( this.get('providedModel.modelName'),{
//                       optionType: this.get('providedModel'),
//                       modelName: this.get('providedModel.modelName'),
//                       active: true
//                   });
//
//                   Ember.run.next(this, function(){
//                       $('tr.warning:last input:first').focus();
//                   });
//                   break;
//           }
//       }
   }
});