export default Ember.Component.extend({
	tagName:'li',
    currentItem: null,
	
	classNameBindings:['active'],
	
	active:function(){
		return this.get('model.route') === this.get('currentItem') || $.inArray( this.get('currentItem'), this.get('model.routeSubNames') ) > -1;
	}.property('currentItem')
});