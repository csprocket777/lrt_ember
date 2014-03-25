/**
 * Created by chshipma on 3/14/14.
 */
export default Ember.ObjectController.extend({
    displayTypeValues: function(){
        return [
            {
                value: "text-field",
                label: "Text Field"
            },
            {
                value: "money",
                label: "Monetary Amount"
            },
            {
                value: "yes-no-toggle",
                label: "Yes / No"
            },
            {
                value: "text-area",
                label: "Text Area"
            },
            {
                value: "date",
                label: "Date"
            },
            {
                value: "single-select-dropdown",
                label: "Select Dropdown (Single)"
            },
            {
                value: "multi-select-dropdown",
                label: "Select Dropdown (Multiple)"
            },
            {
                value: "single-select-radio",
                label: "Choice (Radio - Single)"
            },
            {
                value: "multi-select-checkbox",
                label: "Choice (Checkboxes - Multiple)"
            },
            {
                value: "multi-person-select",
                label: "Person Selection (Multiple)"
            }
        ];
    }.property(),

    contentSourceOptions: function(){
        // THESE PERTAIN TO THE CONTROL SETUP
        return [
            {
                value: "optionSubGroup",
                label: "System Options",
                valueKey: "content.id",
                labelKey: "content.title",
                childModel: "option",
                searchKey: "optionType",
//                relationType: "optionCategories"
            },
            {
                value: "jobRole",
                label: "Personnel",
                valueKey: "content.id",
                labelKey: "content.optionValue",
                childModel: "user",
                searchKey: "jobRole",
//                relationType: "optionValues"
            }
        ];
    }.property(),

    valueKey: function(){
        return this.get('contentSourceOptions').findBy('value', this.get('model.content_source')).valueKey;
    }.property('model.content_source'),

    labelKey: function(){
        return this.get('contentSourceOptions').findBy('value', this.get('model.content_source')).labelKey;
    }.property('model.content_source'),

    sortKey: function(){
        return this.get('contentSourceOptions').findBy('value', this.get('model.content_source')).sortkey;
    }.property('model.content_source'),

    contentSourceValues: function(){
        if( this.get('model.content_source') )
        {
            return this.get('model.store').find( this.get('model.content_source'), {active:true});
        }else{
            return [];
        }
    }.property('model.content_source')
});