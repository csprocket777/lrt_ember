export default Ember.ObjectController.extend({
    childModelName:function(){
        return this.get('parentController.subGroupModel.modelName');
    }.property('parentController.subGroupModel.modelName'),
	
	active:function(){
        return this.get('model') === this.get('parentController.active');
	}.property('parentController.active'),

	
	actions:{
		relationshipSelectChanged:function(data)
		{
            data.modelToManage.set( data.propToTriggerAsDirty , Ember.compare( data.newValue, data.originalValue ) !== 0 );
		},

        addNew:function(evtData, contextData){

            this.get('parentController').sendAction("newAction", evtData, contextData);
            switch( this.get('childModelName') )
            {
                case "privilege":
                    Ember.run.next(this, function(){
                        $('.tab-pane.active tr.warning:last input:first').focus();
                    });
                    break;
            }
        },

        cancelNew: function(evtData, context){
            this.get('parentController').sendAction('cancelAction', evtData, context);
        }
	},

	valueSort:function(a,b){
		return (a.get('title') > b.get('title')) ? 1: ( (b.get('title') > a.get('title'))? -1: 0 );
	}
});