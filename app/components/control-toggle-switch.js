/**
 * Created by chshipma on 11/7/13.
 */
export default Ember.Component.extend({
    tagName:"div",
    attributeBindings:['dataAnimated:data-animated', 'dataSize:data-size', 'dataOnLabel:data-on-label', 'dataOffLabel:data-off-label','dataOn:data-on', 'dataOff:data-off'],
    classNames:['make-switch','pull-right'],

    enabled: true,
    dataAnimated: false,

    isChecked: function(){
        return this.get('value') === true;
    }.property('value'),

    isDisabled: function(){
        if( this.get("state") !== "inBuffer" )
        {
            this
                .$('input[type="checkbox"]')
                .bootstrapSwitch('disabled', this.get('enabled'));
        }
        return !this.get('enabled');
    }.property('enabled'),

    dataOnLabel:function(){
        return this.get('onLabel');
    }.property('onLabel'),

    dataOffLabel:function(){
        return this.get('offLabel');
    }.property('offLabel'),

    dataOn:function(){
        return this.get('on');
    }.property('on'),

    dataOff:function(){
        return this.get('off');
    }.property('off'),

    didInsertElement:function(){
        var self = this;

        this.$('input[type="checkbox"]')
            .data('animated', false)
            .attr({
                "data-size": this.get('dataSize'),
                "data-on-text": this.get('dataOnLabel'),
                "data-off-text": this.get('dataOffLabel'),
                "data-animate": this.get('dataAnimated')
            })
            .bootstrapSwitch()
            .on('switchChange.bootstrapSwitch', function(e,data){
                self.set('value', data);
            });
    },

    updateChecked:function(){
        var self = this;
        this
            .$('input[type="checkbox"]')
            .data('animated', false)
            .attr({
                "data-size": this.get('dataSize'),
                "data-on-text": this.get('dataOnLabel'),
                "data-off-text": this.get('dataOffLabel'),
                "data-animate": this.get('dataAnimated')
            })
            .bootstrapSwitch('state', this.get('value'));
    }.observes('value')
});