import PrivilegedRoute from 'appkit/mixins/privileged-route';
export default Ember.Route.extend( PrivilegedRoute, {

	model:function(params){
        var self = this,
            optionSubGroup = this.get('store').find('optionSubGroup', params.option_sub_group_id);

        var modelToDisplay = optionSubGroup.then(function(result){
                                return self.store.find(result.get('modelName'));
                             });
        var parentModelData = optionSubGroup.then(function(result){
            if( result.get('parentOptionType') )
            {
                return self.store.find(result.get('parentOptionType.modelName'));
            }else{
                return null;
            }
        });

//        var preloadPromise = modelToDisplay.then(function(result) {
//            return Ember.RSVP.all(result.invoke('fetchRequiredData'));
//        });

        var preloadPromise = optionSubGroup.then(function(result) {
            return result.fetchRequiredData();
        });

        return Ember.RSVP.hash({
            optionSubGroup:     optionSubGroup,
            modelToDisplay:     modelToDisplay,
            parentModelData:    parentModelData,
            _preload:           preloadPromise
        });
	},

    afterModel: function(model, transition){
        sessionStorage[ this.controllerFor('app-data').get('data_prefix') + this.controllerFor('app-data').get('data_name') +"_optionsModelChosen" ] = model.optionSubGroup ? model.optionSubGroup.get('id'): model.get('id');
        if( Ember.isNone( this.controllerFor('options').get('selectedOptionGroup') ) ){
            this.controllerFor('options').setSelectedOptionGroup();
        }
    },
	
	setupController:function(controller, model){
		controller.set( 'model', model);
	},

    actions: {
        addNew: function(evt, context){

            var newModel = null,
                modelName = evt.get('modelName'),
                propConstruct = {};

            //PRE CREATE
            switch( evt.get('modelName') )
            {
                case "feature-option":
                    propConstruct.option = "status";
                    propConstruct.active = true;
                    break;

                case "option":
                    propConstruct.optionType = evt;
                    propConstruct.modelName = evt.get('modelName');
                    break;

                case "fiscal-quarter":
                    var tmpQNameSrc = this.get('currentModel.modelToDisplay.lastObject').get('qtrID').split(/(FY*)(\d+)(Q)(\d)/g);
                    if( tmpQNameSrc[4] < 4 )
                    {
                        tmpQNameSrc[4]++;
                    }else{
                        tmpQNameSrc[2]++;
                        tmpQNameSrc[4] = 1;
                    }
                    var tmpQName = tmpQNameSrc.join("");

                    propConstruct.qtrID = tmpQName;
                    propConstruct.startDate = moment( this.get('currentModel.modelToDisplay.lastObject.endDate')).add('days', 1).format('YYYY-MM-DD');
                    propConstruct.endDate = moment( this.get('currentModel.modelToDisplay.lastObject.endDate')).add('months', 3).format('YYYY-MM-DD');
                    propConstruct.fiscalYear = tmpQNameSrc[2];
                    break;

                case "record-field-type":
                    propConstruct.optionType = evt;
                    propConstruct.modelName = evt.get('modelName');
                    propConstruct.active    = true;
                    break;

                case "record-fieldset-template":
                    propConstruct.optionType = evt;
                    propConstruct.modelName = evt.get('modelName');
                    propConstruct.active    = true;
                    break;

                default:
                    propConstruct.active = true;
                    break;

            }


            newModel = this.store.createRecord( modelName, propConstruct);


            // POST CREATE

            switch( evt.get('modelName') )
            {
                case "privilege":
                    // WE NEED TO ASSIGN THE NEWLY CREATED PRIVILEGE RECORD TO IT'S PROPER PRIVILEGE GROUP USING THE context VARIABLE PASSED
                    context.get('privileges').pushObject(newModel);
                    break;
            }
        },

        cancelNew: function(obj, context){
            this.store.deleteRecord(obj);
            this.controllerFor('options').get('unsavedRecords').removeObject(obj);

            // POST REMOVE, CLEAN UP ASSOCIATIONS

            switch( obj.constructor.typeKey )
            {
                case "privilege":
                    // WE NEED TO ASSIGN THE NEWLY CREATED PRIVILEGE RECORD TO IT'S PROPER PRIVILEGE GROUP USING THE context VARIABLE PASSED
                    context.get('privileges').removeObject(obj);
                    break;
            }
        },

        revertChanges: function(evt){
            switch( this.get('currentModel.optionSubGroup.modelName') )
            {
                case "record-fieldset-template":
                    // AS WE HAVE CREATED RECORDS TO MANAGE THE FIELD - TO - TEMPLATE RELATIONSHIP, WE NEED TO DELETE THOSE IF WE REVERT THE TEMPLATE RECORD BACK TO IT'S PRE-MODIFIED STATE
                    // WE ARE INTERCEPTING THE REVERTCHANGES CALL HERE TO DO THIS
                    this.get('currentModel.modelToDisplay').forEach(function(item, index, enumerable){
                        if( !item.get('fields.content').compare(item.get('orig_fields.content')) )
                        {
                            item.get('fields.content').forEach(function(fieldItem, fieldIndex, fieldEnumerable){
                                if( !item.get('orig_fields.content').contains(fieldItem) )
                                {
//                                    fieldRecordsToDelete.pushObject(fieldItem);
                                    this.get('store').deleteRecord(fieldItem);
                                }
                            }, this);
                        }

                        item.get('orig_fields.content').forEach(function(item,index,enumerable){
                            item.rollback();
                        }, this);
                    }, this);
                    break;
            }

            // RETURNING TRUE HERE SO THAT THE CALL WILL CONTINUE TO BUBBLE UP TO THE OPTIONS ROUTE
            return true;
        }
    }
});