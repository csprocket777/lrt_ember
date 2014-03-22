/**
 * Created by chshipma on 11/7/13.
 */
export default Ember.Component.extend({
    tagName:"div",
    attributeBindings:['dataAnimated:data-animated', 'dataOnLabel:data-on-label', 'dataOffLabel:data-off-label','dataOn:data-on', 'dataOff:data-off'],
    classNames:['make-switch','pull-right'],

    name: null,

    privilegeEnabled: true,

    enabled: function(){
        return this.get('enabled');
    }.property('enabled'),

    dataAnimated: false,

    isDisabled: function(){
        return this.get('privilegeEnabled') === true ? !this.get('enabled'): !this.get('privilegeEnabled');
    }.property('enabled', 'privilegeEnabled'),

    checked:function(){
        return this.get('value') && this.get('value').contains(this.get('content'));
    }.property('content', 'value', 'value.@each'),

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
        var $tmpValue = this.get('value');
        var $tmpContent = this.get('content');

        var tThis = this;

        this.$('input[type="checkbox"]')
            .data('animated', false)
            .bootstrapSwitch()
            .on('switchChange.bootstrapSwitch', function(e, data){
            tThis.sendAction('changeAction', { value: $tmpValue, content: $tmpContent, switchData: data });
        });
    },

    updateChecked:function(){
        this
            .$('input[type="checkbox"]')
            .bootstrapSwitch( 'state', this.get('value').contains(this.get('content')) );

    }.observes('value@each', 'content.@each', 'value', 'value.length', 'checked')
});