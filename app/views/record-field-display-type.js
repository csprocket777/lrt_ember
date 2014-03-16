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
        var displayStyle = this.get('displayStyle');

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
                removeFieldAction: this.get('removeFieldAction')
			}));
						
			this.pushObject(this.get('currentViewClass'));
		}
	}
});