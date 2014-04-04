/**
 * Created by chshipma on 4/3/14.
 */
export default Ember.TextField.extend({
    fullRemoteURL: function(){
        return window.apiHost + this.get('remoteURL');
    }.property('remoteURL'),

    didInsertElement: function(){
        if( this.get('placeholder') )
        {
            this.$().attr({
                placeholder: this.get('placeholder'),
                "data-placeholder": this.get('placeholder')
            });
        };

        var initOpts = {};
        initOpts.placeholder = this.get('placeholder');
        initOpts.allowClear = this.get('allowClear');
        initOpts.minimumInputLength = this.get('minimumInputLength');

        if( this.get('remoteSearch') === true )
        {
            var self = this;

            initOpts.ajax = {
                url: this.get('fullRemoteURL'),
                dataType: 'json',
                data: function(term,page){
                    return {
                        query: term,
                        page_limit: 10
                    }
                },
                results: function(data, page){
                    return { results: data.results };
                }
            };

            initOpts.initSelection = function(element, callback){
                var id = $(element).val();
                if( id )
                {
                    $.ajax( self.get('fullRemoteURL'),{
                        data:{
                            query: id
                        },
                        dataType: 'json'
                    }).done(function(data){
                        if( data.results.length === 1 ){
                            callback(data.results[0]);
                            self.set('value', data.results[0].text);
                        }
                    });
                }
            };

            initOpts.dropdownCssClass = "bigdrop";
        }

        var self = this;

        this.$().select2(initOpts).change(function(evt){
            self.set('value', $(evt.currentTarget).val());
        });
    }
});