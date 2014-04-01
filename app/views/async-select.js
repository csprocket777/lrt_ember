export default Ember.Select.extend({

	change:function(evt){
		this.get('controller').send(
			'relationshipSelectChanged', 
			{ 
				newValue: $(evt.target).val(), 
				originalValue: this.get('compareValue'), 
				propToTriggerAsDirty: this.get('dirtyValuePath'), 
				modelToManage:this.get('modelToManage') 
			});
	}
});