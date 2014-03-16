export default Ember.Select.extend({

	change:function(evt){
		this.get('controller').send(
			'relationshipSelectChanged',
			{
				newValue: this.get('selection.content') ? this.get('selection.content'): this.get('selection'),
				originalValue: this.get('compareValue.content') ? this.get('compareValue.content'): this.get('compareValue'),
				propToTriggerAsDirty: this.get('dirtyValuePath'),
				modelToManage:this.get('modelToManage')
			});
	},

	didInsertElement:function(){
        var self = this,
            selfView = this.$();
        this.set('selection', self.get('selectionValue'));

        var buttonContainer = self.get('buttonContainer') ? self.get('buttonContainer'): self.get('addedClasses') ? "<div class='btn-group "+self.get('addedClasses')+"'/>": "<div class='btn-group'/>";

        Ember.run.next(this, function(){

            selfView.multiselect({
                buttonContainer: buttonContainer
            });
        });
	},

    autoRebuild:function(){
        if( this.$() && this.$() !== undefined )
        {
            var self = this;
            Ember.run.next(this, function(){
                if( this.$() !== undefined )
                {
                    this.$( "#"+this.get('elementId') ).multiselect('setOptions',{
                        buttonContainer: self.get('buttonContainer') ? self.get('buttonContainer'): self.get('addedClasses') ? "<div class='btn-group "+self.get('addedClasses')+"'/>": "<div class='btn-group'/>"
                    });
                    this.$().multiselect('rebuild');
                }
            });
        }
    }.observes('content.@each', 'disabled'),

    detectRefresh: function(){
        if( this.$() && this.$() !== undefined )
        {
            var self = this;

            Ember.run.next(this, function(){
                if( this.$() !== undefined )
                {
                    this.$( "#"+this.get('elementId') ).multiselect('setOptions',{
                        buttonContainer: self.get('buttonContainer') ? self.get('buttonContainer'): self.get('addedClasses') ? "<div class='btn-group "+self.get('addedClasses')+"'/>": "<div class='btn-group'/>"
                    });
                    this.$("#"+this.get('elementId')).multiselect('refresh');
                }
            });
        }
    }.observes('selection.@each')
});