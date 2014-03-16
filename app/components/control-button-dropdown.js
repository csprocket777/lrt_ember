/**
 * Created by chshipma on 11/5/13.
 */
export default Ember.Component.extend({
    tagName:"div",
    classNames:['btn-group'],
    classNameBindings:['btnGroupClasses'],
    actions:{
        menuItemSelect:function(menuObject){
            this.set('selectedMenuItem', menuObject);
            this.sendAction("menuItemSelectAction", menuObject);
        }
    }
});