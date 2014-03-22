import PrivilegedController from 'appkit/mixins/privileged-controller';
export default Ember.ObjectController.extend( PrivilegedController, {
    needs: ['options'],
    optionsController: Ember.computed.alias('controllers.options'),

	changesToProcesss: false,
//    modelToDisplay:null,
//    displayStyle:null,
//    descriptionToDisplay:null,
    trackingObject:null,
//    parentModelData:null,

    canCreateUsers:function(){
        var propID = "9"; // Personnel Manage - Create
        return (( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege(propID) ) || (this.get('isOwnRecord') && this.hasPrivilege(propID) && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),

    optionContentLoaded: function(){
//        return this.get('modelToDisplay.content') ? this.get('modelToDisplay.content.isLoaded') : this.get('modelToDisplay.isLoaded');
        return this.get('content.modelToDisplay.isLoaded');
    }.property('content.modelToDisplay.content', 'content.modelToDisplay'),

    optionContentLoading: function(){
//        return this.get('modelToDisplay.content') ? this.get('modelToDisplay.content.isLoading') : this.get('modelToDisplay.isLoading');
        return this.get('model.optionSubGroup.childOptionsLoaded') === false;
    }.property('content.modelToDisplay.content', 'content.modelToDisplay'),


    canViewOptionGroup:function(){
        var propID = this.get('model.optionSubGroup.view_privilege_id.id');
        return propID !== undefined && propID !== null ? this.hasAccessLevel("1") || this.hasPrivilege(propID): this.hasAccessLevel("1");
    }.property('currentUserPrivileges', 'currentUserAccessLevels', 'content.optionSubGroup.view_privilege_id'),


    canEditOptionGroup:function(){
        var propID = this.get('model.optionSubGroup.edit_privilege_id.id');
//        return propID !== undefined && propID !== null ? this.hasAccessLevel("1") || this.hasPrivilege(propID): this.hasAccessLevel("1");
        return propID !== undefined && propID !== null ? this.hasPrivilege(propID): false;//this.hasAccessLevel("1");
    }.property('currentUserPrivileges', 'currentUserAccessLevels', 'content.optionSubGroup.edit_privilege_id'),

    newRecordObserver: function(){
        var unsavedRecords = this.get('optionsController.unsavedRecords');
        this.get('model.optionSubGroup.childOptions').forEach( function(item, index, enumerable){
            if( item.get('isNew') )
            {
                unsavedRecords.addObject(item);
            }else{
                if( item.get('isDirty') !== true )
                {
                    if( unsavedRecords.contains(item) )
                    {
                        unsavedRecords.removeObject(item);
                    }
                }
            }
        });

        this.get('model.modelToDisplay').filterBy('isNew', true).forEach( function(item, index, enumerable){
            if( item.get('isNew') )
            {
                if( !unsavedRecords.contains(item))
                {
                    unsavedRecords.addObject(item);
                }
            }else{
                if( item.get('isDirty') !== true )
                {
                    if( unsavedRecords.contains(item) )
                    {
                        unsavedRecords.removeObject(item);
                    }
                }
            }
        });
    }.observes('model.modelToDisplay.@each.isNew', 'model.optionSubGroup.childOptions.@each.isNew')

});