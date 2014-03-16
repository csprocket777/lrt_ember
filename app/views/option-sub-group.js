export default Ember.View.extend({
	classNames:['optionSubGroupContainer'],

	changeObserver:function(){
		if( this.get('controller.changesToProcess') )
		{
			this.rerender();
			this.set('controller.changesToProcess', false);
		}
	}.observes('controller.changesToProcess')
});