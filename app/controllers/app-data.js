export default Ember.ObjectController.extend({
	isLoaded: false,
	content: {},
    data_prefix: null,
    data_name: null,

    _init: function(){
        this.set('data_prefix', 'Cisco_TM_');
        this.set('data_name', 'lrt_data');
    }.on('init'),

    fullDataKeyName: function(){
        return this.get('data_prefix') + this.get('data_name');
    }.property('data_prefix', 'data_name'),

	load: function(){
		if( localStorage[this.get('data_prefix') + this.get('data_name')] )
		{
			this.set('model', $.parseJSON( localStorage[this.get('data_prefix') + this.get('data_name')] ) );
			this.set('isLoaded', true);
		}
	},
	print: function(){
		console.log( this.get('model') );
	},
	save: function(){
		localStorage[this.get('data_prefix') + this.get('data_name')] = JSON.stringify( this.get('model') );
	},

	updateValue:function( key, value )
	{
		if( !this.get('isLoaded') )
		{
			this.load();
		}
		this.get('model')[key] = value;
		this.save();
	},

	getValue: function(key)
	{
		if( !this.get('isLoaded') )
		{
			this.load();
		}
		return this.get('model')[key];
	}

});