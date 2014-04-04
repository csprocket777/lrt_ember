/**
 * Created by chshipma on 4/3/14.
 */
export default Ember.Select.extend({
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
            initOpts.ajax = {
                url: this.get('remoteURL'),
                dataType: 'jsonp',
                data: function(term,page){
                    return {
                        query: term,
                        page_limit: 10
                    }
                },
                results: function(data, page){
                    return { results: data.results };
                }
            }
        }

        this.$().select2(initOpts);
    }
});