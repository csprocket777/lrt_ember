/**
 * Created by chshipma on 2/20/14.
 */
export default DS.Model.extend({
    view_title:                 DS.attr('string'),
    view_type:                  DS.attr('string'),
    field_associations:         DS.hasMany('record-form-field-association', {inverse:'record_form'}),
    orig_field_associations:    DS.hasMany('record-form-field-association'),

    record_form:                DS.belongsTo('record-form'),

    layout_definitions:         DS.hasMany('record-layout-definition'),

    topLevelDefinitions: function(){
        return this.get('layout_definitions').filterBy('isTopLevel', true);
    }.property('layout_definitions.length'),

    updated_at:         DS.attr(),
    created_at:         DS.attr(),

    fieldsDirty:        DS.attr('boolean', {default:false}),

    order:              DS.attr('number', {default: 0}),

//    fieldsInTemplate: function(){
//        return this.get('field_associations').sortBy('label');
//    }.property('field_associations.length'),

    rawFieldList: function(){
        var tmpFieldList = [];
        this.get('field_associations').forEach(function(item, index, enumerable){
            tmpFieldList.pushObject(item.get('record_field'));
        }, this);

        return tmpFieldList.sortBy('name');
    }.property('field_associations.length'),

    anchorIDHash: function(){
        return "#recordFieldset_"+this.get('id');
    }.property('id'),

    anchorID: function(){
        return "recordFieldset_"+this.get('id');
    }.property('id'),

    dirtyWatcher: function(){
        this.propertyWillChange('isDirty');
        this.set('field_associations_dirty', this.get('field_associations.content').compareEmber(this.get('orig_field_associations.content')) === false);
        this.propertyDidChange('isDirty');
    }.observes('field_associations.length', 'orig_field_associations.length'),

    fetchRequiredData: function() {
        var modelsToFetch = [],
            ret = [];

        var content_source_options = [
            {
                value: "optionSubGroup",
                label: "System Options",
                valueKey: "content.id",
                labelKey: "content.optionValue",
                childModel: "option",
                searchKey: "optionType"
            },
            {
                value: "jobRole",
                label: "Personnel",
                valueKey: "content.id",
                labelKey: "content.optionValue",
                childModel: "user",
                searchKey: "jobRole",
//                relationType: "optionValues"
            }
        ];

        if( this.get('field_associations.length') )
        {
            this.get('field_associations').forEach(function(item, index, enumerable){
                if( !Ember.isNone(item.get('content_source')) )
                {
                    var childModel = content_source_options.findBy('value', item.get('content_source')).childModel,
                        searchKey = content_source_options.findBy('value', item.get('content_source')).searchKey;

                    if(modelsToFetch.isAny('model', childModel) )
                    {
                        modelsToFetch.findBy('model', childModel).ids.pushObject( item.get('content_source_relation') );
                    }else{
                        modelsToFetch.pushObject( { model: childModel, ids:[], searchKey:searchKey } );
                    }
                }
            });
        }

        if( modelsToFetch.get('length') > 0 ){
            modelsToFetch.forEach( function(item, index, enumerable ){
                var searchString = {};
                searchString[ item.searchKey ] = item.ids.join(',');
                searchString.active = true;
                ret.pushObject( this.get('store').find( item.model, searchString ) );
            }, this);
        }

//        switch( this.get('optionType') )
//        {
//            case "recordForm":
////                hash.fields =
//                ret.pushObject( this.get('store').find('record-field') );
//                break;
//        }

        return ret;// Ember.RSVP.hash(hash);
    }
});