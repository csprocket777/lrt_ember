/**
 * Created by chshipma on 3/25/14.
 */
export default Ember.ObjectController.extend({
    recordValueModel: null,
//    recordEditMode: "view",
    relatedModelOptions: [
        {
            label: "Deliverables",
            model: "deliverable"
        }
    ],

//    isEditable: function(){
//        return this.get('recordEditMode') === "edit";
//    }.property('recordEditMode')
});