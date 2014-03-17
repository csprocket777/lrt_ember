/**
 * Created by chshipma on 3/12/14.
 */
export default DS.Model.extend({
    fields:                         DS.hasMany('record-form-field-association', {inverse:"record_layout_definition"}),
    record_form:                    DS.belongsTo('record-form', {inverse: 'layout_definitions'}),
    record_layout_definition:       DS.belongsTo('record-layout-definition', {inverse:'child_definitions'}),
    child_definitions:              DS.hasMany('record-layout-definition', {inverse:'parent_definition'}),
    parent_definition:              DS.belongsTo('record-layout-definition', {inverse:'child_definitions'}),
    displayType:                    DS.attr('string'),
    hasTitle:                       DS.attr('boolean'),
    title:                          DS.attr('string'),
    order:                          DS.attr('number'),


    isTopLevel: function(){
        return Ember.isNone(this.get('parent_definition'));
    }.property('parent_definition'),

    isRow: function(){
        return this.get('displayType') === "row";
    }.property('displayType'),

    isColumn: function(){
        return this.get('displayType') === "column";
    }.property('displayType'),

    verticalOrdering: function(){
        return this.get('displayType') === "row";
    }.property('displayType'),

    horizontalOrdering: function(){
        return this.get('displayType') === "column";
    }.property('displayType')
});