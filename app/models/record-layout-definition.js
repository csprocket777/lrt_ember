/**
 * Created by chshipma on 3/12/14.
 */
export default DS.Model.extend({
    fields:                         DS.hasMany('record-form-field-association', {inverse:"record_layout_definition"}),
    record_form_view:               DS.belongsTo('record-form-view', {inverse: 'layout_definitions'}),
    record_layout_definition:       DS.belongsTo('record-layout-definition', {inverse:'child_definitions'}),
    child_definitions:              DS.hasMany('record-layout-definition', {inverse:'record_layout_definition'}),
    related_model:                  DS.attr('string'),
//    parent_definition:              DS.belongsTo('record-layout-definition', {inverse:'child_definitions'}),
    displayType:                    DS.attr('string'),
    hasTitle:                       DS.attr('boolean'),
    hasMessage:                     DS.attr('boolean'),
    message_text:                   DS.attr('string'),
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

    isTabContainer: function(){
        return this.get('displayType') === "tab-container";
    }.property('displayType'),

    isTab: function(){
        return this.get('displayType') === "tab";
    }.property('displayType'),

    isNotTabRelated: function(){
        return this.get('displayType') !== "tab-container";
    }.property('displayType'),

    isTopContentInTab: function(){
        return this.get('record_layout_definition.displayType') === "tab";
    }.property('record_layout_definition.displayType'),

    isRelatedRecordsView: function(){
        return this.get('displayType') === "relatedRecordsView";
    }.property('displayType'),

    isWorkflowView: function(){
        return this.get('displayType') === "workflowView";
    }.property('displayType'),

    anchorIDHash:function(){
        return "#"+this.get('id');
    }.property('id'),

    anchorID:function(){
        return this.get('id');
    }.property('id'),

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