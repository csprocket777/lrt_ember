/**
 * Created by chshipma on 3/14/14.
 */
export default Ember.ObjectController.extend({
    displayTypeValues: function(){
        return [
            {
                value:          "text-field",
                label:          "Text Field",
                optionGroup:    "Editable"
            },
            {
                value:          "text-field-lrg",
                label:          "Text Field - Large",
                optionGroup:    "Editable"
            },
            {
                value: "money",
                label: "Monetary Amount",
                optionGroup:    "Editable"
            },
            {
                value: "yes-no-toggle",
                label: "Yes / No",
                optionGroup:    "Editable"
            },
            {
                value: "text-area",
                label: "Text Area",
                optionGroup:    "Editable"
            },
            {
                value: "date",
                label: "Date",
                optionGroup:    "Editable"
            },
            {
                value: "single-select-dropdown",
                label: "Select Dropdown (Single)",
                optionGroup:    "Editable"
            },
            {
                value: "multi-select-dropdown",
                label: "Select Dropdown (Multiple)",
                optionGroup:    "Editable"
            },
            {
                value: "single-select-radio",
                label: "Choice (Radio - Single)",
                optionGroup:    "Editable"
            },
            {
                value: "multi-select-checkbox",
                label: "Choice (Checkboxes - Multiple)",
                optionGroup:    "Editable"
            },
            {
                value: "multi-person-select",
                label: "Person Selection (Multiple)",
                optionGroup:    "Editable"
            },
            {
                value: "search-field-ad",
                label: "CEC Search",
                optionGroup:    "Editable"
            },


            {
                value: "ro-h1",
                label: "Header 1",
                optionGroup:    "View Only"
            },
            {
                value: "ro-h2",
                label: "Header 2",
                optionGroup:    "View Only"
            },
            {
                value: "ro-h3",
                label: "Header 3",
                optionGroup:    "View Only"
            },
            {
                value: "ro-h4",
                label: "Header 4",
                optionGroup:    "View Only"
            },
            {
                value: "ro-h5",
                label: "Header 5",
                optionGroup:    "View Only"
            },
            {
                value: "ro-lead-body",
                label: "Plain text - lead",
                optionGroup:    "View Only"
            },
            {
                value: "ro-plain-text",
                label: "Plain text",
                optionGroup:    "View Only"
            },
            {
                value: "ro-plain-text-bold",
                label: "Plain text - bold",
                optionGroup:    "View Only"
            },
            {
                value: "ro-plain-text-date",
                label: "Date - plain",
                optionGroup:    "View Only"
            },
            {
                value: "ro-personnel-color-coded",
                label: "Personnel - Badge Color Coded",
                optionGroup:    "View Only"
            },
            {
                value: "ro-personnel",
                label: "Personnel - Badge Color Coded",
                optionGroup:    "View Only"
            },

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