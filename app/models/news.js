export default DS.Model.extend({
	credit:			DS.hasMany('user',{async:true}),
	dateAdded:		DS.attr('date'),
	description:	DS.attr('string'),
	//link:			DS.attr('link'),
	updateType:		DS.belongsTo('option'),
	versionNumber:	DS.attr('number')
});