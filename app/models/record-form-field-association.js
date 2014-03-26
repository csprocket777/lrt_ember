/**
 * Created by chshipma on 3/11/14.
 */
export default DS.Model.extend({
    record_form_view:               DS.belongsTo('record-form-view', {inverse:'field_associations'}),
    record_field:                   DS.belongsTo('record-field', {inverse: 'fieldAssociations'}),

    required:                       DS.attr('boolean', {default:false}),
    displayType:                    DS.attr('string', {default: 'text-field'}),
    label:                          DS.attr('string'),
    helpLine:                       DS.attr('string'),
    tooltipContent:                 DS.attr('string'),
    record_layout_definition:       DS.belongsTo('record-layout-definition', {inverse: "fields"}),
    order:                          DS.attr('number'),
    content_source:                 DS.attr('string'),
    content_source_relation:        DS.attr(),
    field_dependant_on:             DS.belongsTo('record-form-field-association'),


    field_dependant_on_dirty:       DS.attr('boolean', {default: false}),

    field_dependant_on_dirtyObserver: function(){
        this.set('field_dependant_on_dirty', this.get('data.field_dependant_on') !== this.get('field_dependant_on'));
    }.observes('field_dependant_on'),


    content_source_options: function(){
        // THESE PERTAIN TO THE RESULTING VALUE SELECTION, NOT THE CONTROL SETUP
        return [
            {
                value: "optionSubGroup",
                label: "System Options",
                valueKey: "content.id",
                labelKey: "content.optionValue",
                childModel: "option",
                searchKey: "optionType",
//                relationType: "optionCategories"
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
    }.property(),

    added: function(){
        return this.get("record_form") ? this.get("record_form.orig_field_associations").contains(this) === false : false;
    }.property('record_form.field_associations.length'),

    needsSourceChoice: function(){
        var choicesNeedingSource = [
            "single-select-dropdown",
            "multi-select-dropdown",
            "single-select-radio",
            "multi-select-checkbox",
            "multi-person-select"
        ];

        return choicesNeedingSource.contains(this.get('displayType'));
    }.property('displayType'),

    content_source_relation_values: function(){
        if( Ember.isNone(this.get('field_dependant_on')) )
        {
            if( !Ember.isNone( this.get('content_source') ) && !Ember.isNone( this.get('content_source_relation') ) )
            {
                var contentSourceOption = this.get('content_source_options').findBy('value', this.get('content_source'));
                var childModel = contentSourceOption.childModel,
                    searchKey = contentSourceOption.searchKey,
                    searchString = {};
//                    relationType = contentSourceOption.relationType,

                searchString[ searchKey ] = this.get('content_source_relation');
                searchString.active = true;

//                switch( relationType ){
//                    case "optionCategories":
                var ret = this.get('store').find(childModel, searchString);

                return ret;
//                        break;

//                    case "optionValues":
//                        break;
//                }

            }
        }else{

        }
    }.property('content_source', 'content_source_relation'),

    related_field_info: function(){
        var ret = "This field is dependant upon you choosing a value in the ";
        ret += this.get('field_dependant_on') ? this.get('field_dependant_on.label') : "[not yet assigned]";
        ret += " field.";

        ret += '<br/><span class="label label-danger" style="display: inline-block; white-space: normal">YOU HAVE NOT SOLVED THIS YET. WAITING ON VALUE LINKAGE</span>';

        return ret;
    }.property('field_dependant_on'),

    content_source_relation_values_labelKey: function(){
        if( !Ember.isNone( this.get('content_source') ) && !Ember.isNone( this.get('content_source_relation') ) )
        {
            return this.get('content_source_options').findBy('value', this.get('content_source')).labelKey;
        }
    }.property('content_source', 'content_source_relation'),

    content_source_relation_values_valueKey: function(){
        if( !Ember.isNone( this.get('content_source') ) && !Ember.isNone( this.get('content_source_relation') ) )
        {
            return this.get('content_source_options').findBy('value', this.get('content_source')).valueKey;
        }
    }.property('content_source', 'content_source_relation')
});