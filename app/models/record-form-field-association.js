/**
 * Created by chshipma on 3/11/14.
 */
export default DS.Model.extend({
    record_form:                    DS.belongsTo('record-form', {inverse:'field_associations'}),
    record_field:                DS.belongsTo('record-field', {inverse: 'fieldAssociations'}),

    required:                       DS.attr('boolean', {default:false}),
    displayType:                    DS.attr('string', {default: 'text-field'}),
    label:                          DS.attr('string'),
    helpLine:                       DS.attr('string'),
    tooltipContent:                 DS.attr('string'),
    record_layout_definition:       DS.belongsTo('record-layout-definition', {inverse: "fields"}),
    order:                          DS.attr('number'),
    content_source:                 DS.attr('string'),
    content_source_relation:        DS.attr(),


    content_source_options: function(){
        return [
            {
                value: "optionSubGroup",
                label: "System Options",
                valueKey: "content.id",
                labelKey: "content.optionValue",
                childModel: "option",
                searchKey: "optionType"
            }
        ];
    }.property(),

    added: function(){
        return this.get("record_form.orig_field_associations").contains(this) === false;
    }.property('record_form.field_associations.@each'),

    needsSourceChoice: function(){
        var choicesNeedingSource = [
            "single-select-dropdown",
            "multi-select-dropdown",
            "single-select-radio",
            "multi-select-checkbox"
        ];

        return choicesNeedingSource.contains(this.get('displayType'));
    }.property('displayType'),

    content_source_relation_values: function(){
        if( !Ember.isNone( this.get('content_source') ) && !Ember.isNone( this.get('content_source_relation') ) )
        {

            var childModel = this.get('content_source_options').findBy('value', this.get('content_source')).childModel,
                searchKey = this.get('content_source_options').findBy('value', this.get('content_source')).searchKey,
                searchString = {};

            searchString[ searchKey ] = this.get('content_source_relation');
            searchString.active = true;

            return this.get('store').find(childModel, searchString);
        }
    }.property('content_source', 'content_source_relation'),

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