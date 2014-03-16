export default Ember.ContainerView.extend({
	currentViewClass: null,
	init: function(){
		this._super();
		this.setupView();
	},
	
//	viewChanged:function(){
//		this.removeObject( this.get('currentViewClass') );
//		this.setupView();
//	}.observes("model.@each"),

    viewChanged:function(){
        this.removeObject( this.get('currentViewClass') );
        this.setupView();
    }.observes("model.optionSubGroup.id"),//"model"),
	
	setupView: function(){
		var providedModel = this.get('model');
        var displayStyle = this.get('model.optionSubGroup.displayStyle');
        var subGroupModel = this.get('model.optionSubGroup');
//        var componentLookup = Lrt.testing ?
//            Lrt.__container__.lookup('component-lookup:main') :
//            this.container.lookup('component-lookup:main');

        var componentLookup = this.container.lookup('component-lookup:main');

//		var	viewClass = Lrt.testing ?
//									Lrt.__container__.lookupFactory('component:displayType-'+displayStyle) :
//									this.container.lookupFactory('component:displayType-'+displayStyle);

        var	viewClass = componentLookup.lookupFactory('display-type-'+displayStyle);

		if( viewClass )
		{

			this.set('currentViewClass', this.createChildView( viewClass, {
				model: this.get('model'),
                tagName:'section',
                subGroupModel: subGroupModel,
                providedStore: this.get('providedStore'),
                createOptionAction: "createOption",
                trackingObject: this.get('trackingObject'),
                parentModelData: this.get('model.parentModelData'),
                canEdit:    this.get('canEdit'),
                disabled:    !this.get('canEdit'),
                optionsController: this.get('optionsController'),
                newAction: this.get('newAction'),
                cancelAction: this.get('cancelAction')
			}));
						
			this.pushObject(this.get('currentViewClass'));
		}
	}
});