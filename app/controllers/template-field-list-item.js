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
            }
        ];
    }.property(),

    contentSourceOptions: function(){
        return [
            {
                value: "optionSubGroup",
                label: "System Options",
                valueKey: "content.id",
                labelKey: "content.title",
                sortkey: "title"
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
        return this.get('store').find( this.get('model.content_source'));
    }.property('model.content_source'),
});