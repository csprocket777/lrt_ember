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
    }.property('displayType')
});