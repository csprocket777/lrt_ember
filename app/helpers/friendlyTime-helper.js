export default Ember.Handlebars.helper('friendly-time', function(value, options){
//	return new Handlebars.SafeString( moment(value).format("ddd MMM Do, YYYY") );
    return moment(value).format("ddd MMM Do, YYYY");
});