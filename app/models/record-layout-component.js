/**
 * Created by chshipma on 3/12/14.
 */
export default DS.Model.extend({
    fields:                         DS.hasMany('recordFieldsetFieldAssociation', {inverse:"record_layout_component_id"}),
    record_form:                    DS.belongsTo('record-form'),
    record_layout_component_id:     DS.belongsTo('recordLayoutComponent', {inverse:'child_components'}),
    child_components:               DS.hasMany('recordLayoutComponent', {inverse:'parent_component'}),
    parent_component:               DS.belongsTo('recordLayoutComponent', {inverse:'child_components'}),
    displayType:                    DS.attr('string'),
    hasTitle:                       DS.attr('boolean'),
    title:                          DS.attr('string'),
    order:                          DS.attr('number'),


    isTopLevel: function(){
        return Ember.isNone(this.get('parent_component'));
    }.property('parent_component'),

    isRow: function(){
        return this.get('displayType') === "row";
    }.property('displayType'),

    isColumn: function(){
        return this.get('displayType') === "column";
    }.property('displayType')
});