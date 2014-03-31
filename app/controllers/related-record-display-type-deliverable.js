/**
 * Created by chshipma on 3/25/14.
 */

import relatedRecordDisplayTypeBase from "appkit/controllers/related-record-display-type-base";

export default relatedRecordDisplayTypeBase.extend({
    modalityChoiceOptions: null,
    complexityChoiceOptions: null,
    contentReadinessOptions: Ember.A([
        {
            id: 0,
            optionValue: "Not ready"
        },
        {
            id: 25,
            optionValue: "25%"
        },
        {
            id: 50,
            optionValue: "50%"
        },
        {
            id: 75,
            optionValue: "75%"
        },
        {
            id: 100,
            optionValue: "100%"
        }
    ]),

    percentNewContentOptions: Ember.A([
        {
            id: 0,
            optionValue: "All Exists"
        },
        {
            id: 25,
            optionValue: "25%"
        },
        {
            id: 50,
            optionValue: "50%"
        },
        {
            id: 75,
            optionValue: "75%"
        },
        {
            id: 100,
            optionValue: "100% (All is new content)"
        }
    ]),

    contentDurationUnitOptions: null,

    _setup: function(){
        this.set('modalityChoiceOptions', this.get('store').find('option', {optionType:12, active:true}) );
        this.set('complexityChoiceOptions', this.get('store').find('option', {optionType:13, active:true}) );
        this.set('contentDurationUnitOptions', this.get('store').find('option', {optionType:9, active:true}) );
    }.on('init'),

    actions:{
        addDeliverable: function(evt){
            var self = this;

            this.get('store').createRecord('deliverable', {
                record: this.get('parentController.recordValueModel')
            }).save().then(function(){
                self.set("model", self.reloadModel());
            });
        }
    }

});