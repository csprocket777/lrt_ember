export default Ember.Handlebars.helper('news-type-display', function(option, id){
	var ret ="<span class='label";
	switch( id )
	{
		case 253:
			ret += " label-info";
		break;
		
		case 254:
			ret += " label-info";
		break;
		
		case 255:
			ret += " label-important";
		break;
		
		default:
			ret += " label-success";
		break;
	}
	
	ret += "'>"+option+"</span>";
	return ret;
});