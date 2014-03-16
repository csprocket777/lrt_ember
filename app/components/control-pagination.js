/**
 * Created by chshipma on 11/1/13.
 */
export default Ember.Component.extend({
    tagName: "ul",
    classNameBindings: "paginationSize",
    classNames: ['pagination'],
    paginationDropdownText: function(){
       return this.get('itemsPerPage') + " Records Per Page ";
    }.property('itemsPerPage'),

    selectedPerPageAmount:function(){
        if( this.get('itemsPerPage') )
        {
            return this.get('itemsPerPageOptions').findBy("value", this.get('itemsPerPage'));
        }else{
            return this.get('itemsPerPageOptions').findBy("default", true);
        }
    }.property('itemsPerPage'),

    itemsPerPageOptions:[
        Ember.Object.create({
            value: 10,
            label: "10",
            type: "menuItem",
            selectAction: "setItemsPerPage",
            default:false
        }),
        Ember.Object.create({
            value: 25,
            label: "25",
            type: "menuItem",
            selectAction: "setItemsPerPage",
            default:true
        }),
        Ember.Object.create({
            value: 50,
            label: "50",
            type: "menuItem",
            selectAction: "setItemsPerPage",
            default:false
        }),
        Ember.Object.create({
            value: 100,
            label: "100",
            type: "menuItem",
            selectAction: "setItemsPerPage",
            default:false
        }),
        Ember.Object.create({
            value: 200,
            label: "200",
            type: "menuItem",
            selectAction: "setItemsPerPage",
            default:false
        })
    ],

    actions:{
        setItemsPerPage:function(selection){
            this.sendAction('itemsPerPageChangeAction', selection.get('value'));
        }
    }
});