export default Ember.ContainerView.extend({
	currentViewClass: null,
	init: function(){
		this._super();
		this.setupView();
	},

    viewChanged:function(){
        this.removeObject( this.get('currentViewClass') );
        this.setupView();
    }.observes("displayStyle"),//"model"),
	
	setupView: function(){
        var modelStyle = this.get('model.related_model');

        var	viewClass = this.container.lookup('view:related-record-display-type-'+modelStyle);
        var	controllerClass = this.container.lookup('controller:related-record-display-type-'+modelStyle);

        if( controllerClass )
        {
//            controllerClass.set('recordType', modelStyle);
            controllerClass.setProperties(
                {
                    parentController: this.get('controller.parentController'),
                    recordEditMode: this.get('controller.parentController.recordEditMode'),
                    layoutDefinitionModel: this.get('model'),
                    recordValueModel: this.get('controller.parentController.recordValueModel')
                }
            )
        }

		if( viewClass )
		{
			this.set('currentViewClass',
                this.createChildView( viewClass, {
                    controller: controllerClass,
                    recordValueModel: this.get('recordValueModel')
                })
            );
						
			this.pushObject(this.get('currentViewClass'));
		}
	}
});