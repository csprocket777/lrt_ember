export default Ember.Component.extend({
	actions:{
		save:function(){
            $('#save-bar-save-button').button('loading');
			this.sendAction('saveAction');
		},
		
		revert:function(){
			this.sendAction('revertAction');
		}
	}
});