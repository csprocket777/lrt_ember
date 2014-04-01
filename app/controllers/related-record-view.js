/**
 * Created by chshipma on 3/25/14.
 */
export default Ember.ObjectController.extend({
    recordValueModel: null,
    relatedModelOptions: [
        {
            label: "Deliverables",
            model: "deliverable"
        }
    ]
});