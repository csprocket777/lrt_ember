export default Ember.ArrayController.extend({
    needs:['app-data'],
	optionGroups: null,
	optionSubGroups: null,
	options:null,
    fiscalQuarters:null,
    prioritizationItem:null,
    featureOption:null,
    privileges:null,
    privilegeGroups:null,
    accessLevels:null,
    recordFieldTypes:null,
    unsavedRecords: null, // []

    currentModelID: null,

    _setup: function() {
        this.set('unsavedRecords', []);
        this.setSelectedOptionGroup();
    }.on('init'),

    setSelectedOptionGroup: function(){
        var ret = this.get('model.length') > 0 && sessionStorage[ this.get('controllers.app-data.fullDataKeyName') +"_optionsModelChosen" ] ? this.get('model').findBy('id',sessionStorage[ this.get('controllers.app-data.fullDataKeyName') +"_optionsModelChosen" ]): this.get('model').findBy('id',"1");
        this.set('selectedOptionGroup', ret);
    },
	
	selectedOptionGroup: null,


    subGroupChangeObserver:function(){
        if( !Ember.isNone(this.get('selectedOptionGroup')) )
        {
            this.transitionToRoute('optionSubGroup',this.get('selectedOptionGroup.id'));
        }
    }.observes('selectedOptionGroup'),

    saveNeeded: Ember.computed.alias('unsavedRecords.length')
});