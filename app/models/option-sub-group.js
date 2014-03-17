export default DS.Model.extend({
    title:				DS.attr('string'),
    option_group_id:	DS.belongsTo('optionGroup'),
    displayStyle:		DS.attr('string'),
    optionType:			DS.attr('string'),//DS.hasMany('option'),
    modelName:			DS.attr('string'),
    description:		DS.attr('string'),
    childOptions:            DS.hasMany('option'),
    
    parentOptionType:   DS.belongsTo('optionSubGroup'),
    view_privilege_id:      DS.belongsTo('privilege'),
    edit_privilege_id:      DS.belongsTo('privilege'),

    orig_viewPrivilege: DS.belongsTo('privilege'),
    orig_editPrivilege: DS.belongsTo('privilege'),

    editPrivDirty:      DS.attr('boolean', {default:false}),
    viewPrivDirty:      DS.attr('boolean', {default:false}),

    childOptionsLoaded: function(){
        return this.get('childOptions').every(function(item,index,enumerable){
            return item.get("isLoaded") === true;
        });
    }.property('childOptions.@each'),

    fetchRequiredData: function() {
        var hash = {};

        switch( this.get('optionType') )
        {
            case "recordForm":
                hash.fields = this.get('store').find('record-field');
                break;
        }

        return Ember.RSVP.hash(hash);
    }
});