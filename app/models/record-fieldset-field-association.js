/**
 * Created by chshipma on 3/11/14.
 */
export default DS.Model.extend({
    record_fieldset_template_id:    DS.belongsTo('record-form', {inverse:'fields'}),
    record_field_id:                DS.belongsTo('recordField', {inverse: 'fieldAssociations'}),

    required:                       DS.attr('boolean', {default:false}),
    displayType:                    DS.attr('string', {default: 'text-field'}),
    label:                          DS.attr('string'),
    helpLine:                       DS.attr('string'),
    tooltipContent:                 DS.attr('string'),
    record_layout_component_id:     DS.belongsTo('record_layout_component', {inverse: "fields"}),
    order:                          DS.attr('number'),
    content_source:                 DS.attr('string'),
    content_source_relation_id:     DS.attr(),

    added: function(){
        return this.get("record_fieldset_template_id.orig_fields").contains(this) === false;
    }.property('record_fieldset_template_id.fields.@each'),

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