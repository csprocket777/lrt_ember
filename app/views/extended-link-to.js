/**
 * Created by chshipma on 3/26/14.
 */
export default Ember.LinkView.reopen({
    attributeBindings: [
        'dataToggle:data-toggle',
        'dataPlacement:data-placement',
        'dataContainer:data-container'
    ],

    dataToggle: false,
    dataPlacement: false,
    dataContainer: false
});