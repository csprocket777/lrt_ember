/**
 * Created by chshipma on 3/14/14.
 */
export default Ember.Component.extend({

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
        // THESE PERTAIN TO THE RESULTING VALUE SELECTION, NOT THE CONTROL SETUP
        return [
            {
                value: "optionSubGroup",
                label: "System Options",
                valueKey: "content.id",
                labelKey: "content.optionValue",
                childModel: "option",
                searchKey: "optionType",
                shallowLabelKey: "optionValue"
//                relationType: "specificOptionValues"
            },
            {
                value: "jobRole",
                label: "Personnel",
                valueKey: "content.id",
                labelKey: "content.optionValue",
                childModel: "user",
                searchKey: "jobRole",
                shallowLabelKey: "name"
//                relationType: "optionValues"
            }
        ];
    }.property(),

    valueKey: function(){
        return this.get('model.content_source') ? this.get('contentSourceOptions').findBy('value', this.get('model.content_source')).valueKey: null;
    }.property('model.content_source'),

    shallowLabelKey: function(){
        return this.get('model.content_source') ? this.get('contentSourceOptions').findBy('value', this.get('model.content_source')).shallowLabelKey: null;
    }.property('model.content_source'),

    labelKey: function(){
        return this.get('model.content_source') ? this.get('contentSourceOptions').findBy('value', this.get('model.content_source')).labelKey: null;
    }.property('model.content_source'),

    childModel: function(){
        return this.get('model.content_source') ? this.get('contentSourceOptions').findBy('value', this.get('model.content_source')).childModel: null;
    }.property('model.content_source'),

    searchKey: function(){
        return this.get('model.content_source') ? this.get('contentSourceOptions').findBy('value', this.get('model.content_source')).searchKey: null;
    }.property('model.content_source'),

    actions:{
        removeField: function(evt){
            this.sendAction("removeFieldAction", this.get('model'));
        },

        changeOrderUp: function(itemType){
            this.sendAction('changeOrderUpAction', this.get('model'), itemType);
        },

        changeOrderDown: function(itemType){
            this.sendAction('changeOrderDownAction', this.get('model'), itemType);
        }
    },

    recordValueModel: null,

    fieldValue: function(){
        var ret = this.get('recordValueModel') ? this.get('recordValueModel.record_field_values').findBy('field', this.get('model.record_field')): null;

        if( ret )
        {
            ret = ret.get('data_type') === "relationship" ? ret.get('relatedValues'): ret.get('value');
        }

        return ret ? ret : null;
    }.property('recordValueModel.record_field_values'),

    fieldValueReadOnly: function(){
        var ret = this.get('recordValueModel') ? this.get('recordValueModel.record_field_values').findBy('field', this.get('model.record_field')): null;

        var returnVal = null;

        if( ret )
        {
            switch( ret.get('data_type') )
            {
                case "relationship":
                    switch( this.get('childModel') )
                    {
                        case "user":
                            return this.get('fieldValue');
                            break;

                        default:
                            this.get('fieldValue').forEach(function(item, index, enumerable){
                                returnVal = returnVal ? returnVal += ", "+item.get(this.get('shallowLabelKey')): item.get(this.get('shallowLabelKey'));
                            }, this);
                            break;
                    }
                    return returnVal;
                    break;

                default:
                    return this.get('fieldValue');
            }
        }
    }.property('fieldValue.content.length')
});