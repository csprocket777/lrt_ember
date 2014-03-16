/**
 * Created by chshipma on 3/13/14.
 */
export default Ember.Component.extend({
    tagName: "span",
    attributeBindings: ['dataPlacement:data-placement', 'dataContainer:data-container', 'dataTrigger:data-trigger', 'rel', 'dataToggle:data-toggle', 'dataHtml:data-html', 'dataContent:data-content', 'dataTitle:data-title'],

    rel: "popover",
    dataToggle: "popover",

    dataContainer: 'body',
    dataTrigger:'click',
    dataPlacement:'auto',

    didInsertElement: function(evt){
        $("#"+this.get('elementId')).popover();
    }
});