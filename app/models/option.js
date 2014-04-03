//import Bootstrap from 'vendor/ember-addons.bs_for_ember/dist/js/bs-core.min.js';
import Relatable from 'appkit/models/relatable';


var Bootstrap = window.Bootstrap;
export default Relatable.extend({
	optionType:				DS.belongsTo('optionSubGroup'),
    optionValue:			DS.attr('string'),
    optionRelationValue:	DS.hasMany('option', {inverse: 'option_belongs_to', async: true}),
    active:					DS.attr('boolean'),
    option_relation_value:	DS.hasMany('option', {inverse: 'option_belongs_to'}),

    option_belongs_to:      DS.hasMany('option', {inverse: 'option_relation_value'}),
    
    relationDirty:			DS.attr('boolean', {default:false}),
    
	anchorID:function(){
		return "#"+this.get('id');
	}.property('id'),

	didUpdate:function(){
		Bootstrap.NM.push('Save was successful!', 'success');
	},
	
	optionRelationIsDirty: DS.attr('boolean', {default:false}),
	
	recordDirty:function(){
		return this.get('optionRelationIsDirty') || this.get('isDirty');
	}.property('optionRelationIsDirty', 'isDirty')
});