export default Ember.ContainerView.extend({
	currentViewClass: null,
    recordEditMode: "view",

	init: function(){
		this._super();
		this.setupView();
	},

    viewChanged:function(){
        this.removeObject( this.get('currentViewClass') );
        this.setupView();
    }.observes("edit_display_style", "read_only_display_style", "recordEditMode"),//"model"),
	
	setupView: function(){
        var displayStyle = this.get('recordEditMode') === "view" ? this.get('read_only_display_style'): this.get('edit_display_style');

//        var componentLookup = this.container.lookup('component-lookup:main');

        var	viewClass = this.container.lookup('component-lookup:main').lookupFactory('record-field-display-type-'+displayStyle);

		if( viewClass )
		{
			this.set('currentViewClass', this.createChildView( viewClass, {
				model: this.get('model'),
//                layoutName: ,
                providedStore: this.get('store'),
                layoutEditMode: this.get('layoutEditMode'),
                classNames: ['form-group', 'record-layout-field-display-type-container'],
                removeFieldAction: this.get('removeFieldAction'),
                changeOrderUpAction: this.get('changeOrderUpAction'),
                changeOrderDownAction: this.get('changeOrderDownAction'),
                recordValueModel: this.get('recordValueModel'),
                recordEditMode: this.get('recordEditMode')
			}));
						
			this.pushObject(this.get('currentViewClass'));
		}
	}
});