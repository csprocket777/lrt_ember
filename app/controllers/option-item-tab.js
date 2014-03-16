export default Ember.ObjectController.extend({
	needs:['option-sub-group'],
	
	active:function(){
		return this.get('model') === this.get('controllers.option-sub-group.model.optionSubGroup.parentOptionType.childOptions.firstObject');
	}.property('controllers.option-sub-group.model')
});