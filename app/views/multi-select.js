export default Ember.Select.extend({
	didInsertElement:function(){
        var buttonText = this.get('buttonLabel') +'   <b class="caret"></b>';
        var selectAllOption = this.get('selectAllOption');

        Ember.run.next(this,function(){
            this.$().multiselect({
                buttonText: function(options, select){
                    return buttonText;
                },
                buttonContainer: this.get('useAnchorTag') ? null:'<div class="btn-group" />',
                useAnchorTag: this.get('useAnchorTag'),
                buttonClass: "",
                includeSelectAllOption: selectAllOption
            });
        });
	},

    autoRebuild:function(){
        Ember.run.next(this, function(){
            this.$().multiselect('rebuild');
        });
    }.observes('content')
});