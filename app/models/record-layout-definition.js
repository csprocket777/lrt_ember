/**
 * Created by chshipma on 3/12/14.
 */
export default DS.Model.extend({
    fields:                         DS.hasMany('record-form-field-association', {inverse:"record_layout_definition"}),
    record_form:                    DS.belongsTo('record-form', {inverse: 'layout_definitions'}),
    record_layout_definition:       DS.belongsTo('record-layout-definition', {inverse:'child_definitions'}),
    child_definitions:              DS.hasMany('record-layout-definition', {inverse:'record_layout_definition'}),
//    parent_definition:              DS.belongsTo('record-layout-definition', {inverse:'child_definitions'}),
    displayType:                    DS.attr('string'),
    hasTitle:                       DS.attr('boolean'),
    title:                          DS.attr('string'),
    order:                          DS.attr('number'),

//    fieldsSorted: function(){
//        return this.get('fields').sortBy('order');
//    }.property('fields.@each.order'),

    isTopLevel: function(){
        return Ember.isNone(this.get('record_layout_definition'));
    }.property('record_layout_definition'),

    isRow: function(){
        return this.get('displayType') === "row";
    }.property('displayType'),

    isColumn: function(){
        return this.get('displayType') === "column";
    }.property('displayType'),

    hasSiblings: function(){
        var hasSiblings = false;

        if( this.get('record_layout_definition') )
        {
            hasSiblings = this.get('record_layout_definition') && this.get('record_layout_definition.child_definitions') ? this.get('record_layout_definition.child_definitions.length') > 1 : hasSiblings;
        }else{
            hasSiblings = this.get('record_form.topLevelDefinitions') ? this.get('record_form.topLevelDefinitions.length') > 1 : hasSiblings;
        }

        return hasSiblings;
    }.property('record_layout_definition.child_definitions.length', 'record_form.topLevelDefinitions.length'),

    orderCanMoveUp: function(){
        return parseInt(this.get('order'), 10) > 0;
    }.property('order', 'hasSiblings'),

    orderCanMoveDown: function(){
        var endIndex = this.get('record_layout_definition') ?
            this.get('record_layout_definition.child_definitions.length')-1 :
            this.get('record_form.topLevelDefinitions.length')-1;

        return parseInt(this.get('order'), 10) < endIndex;
    }.property('order', 'hasSiblings'),

    verticalOrdering: function(){
        return this.get('displayType') === "row" && this.get('hasSiblings');
    }.property('displayType', 'hasSiblings'),

    horizontalOrdering: function(){
        return this.get('displayType') === "column" && this.get('hasSiblings');
    }.property('displayType', 'hasSiblings')
});