/**
 * Created by chshipma on 10/16/13.
 */
import PrivilegedController from 'appkit/mixins/privileged-controller';
import PaginationMixin from 'appkit/mixins/pagination';
export default Ember.ArrayController.extend( PaginationMixin, PrivilegedController, {
    unfilteredModel:null,

    nameSearchValue: null,

    canCreateUsers:function(){
        var propID = "9"; // Personnel Manage - Create
        return (( (this.hasPrivilege('18') || this.hasPrivilege('17')) && this.hasPrivilege(propID) ) || (this.get('isOwnRecord') && this.hasPrivilege(propID) && this.hasPrivilege('16') ));
    }.property('currentUserPrivileges'),


    itemsPerPage: 25,
    pagesToShow: 10,
    paginatedRoute: 'users.page',

    groupFilter:null, /*function(key, value){
        if( arguments.length > 1 && this.get('groupFilterContent.length') > 0)
        {
            this.set('defaultGroupSelection', value);
        }

        return this.get('defaultGroupSelection.content');
    }.property('defaultGroupSelection'),*/

    groupFilterContent:null,
    groupFilterContentFiltered:null,

    groupFilterContentObserver:function(){
        var ret = this.get('groupFilterContent.content');

            ret.set('sortProperties', 'optionValue');
            if( this.get('activeOptionsOnly') )//&& ret.get('content') )
            {
                ret = ret.filterProperty('active', true);
            }

//            if( ret.get('content') ){
//                ret = ret.get('content.content');
//            }

            if(ret.get('length'))
            {
                ret.sort(function(a,b) {return (a.get('optionValue') > b.get('optionValue')) ? 1 : ((b.get('optionValue') > a.get('optionValue')) ? -1 : 0);} );
            }

            this.set('groupFilterContentFiltered', ret);
    }.observes('groupFilterContent.content', 'activeOptionsOnly'),


    defaultGroupSelection: null,



    roleFilter: null,
    roleFilterContent:null,
    roleFilterContentFiltered:null,

    roleFilterContentObserver:function(){
        var ret = this.get('roleFilterContent.content');

        ret.set('sortProperties', 'optionValue');
        if( this.get('activeOptionsOnly') )//&& ret.get('content') )
        {
            ret = ret.filterProperty('active', true);
        }

//        if( ret.get('content') ){
//            ret = ret.get('content.content');
//        }

        if(ret.get('length'))
        {
            ret.sort(function(a,b) {return (a.get('optionValue') > b.get('optionValue')) ? 1 : ((b.get('optionValue') > a.get('optionValue')) ? -1 : 0);} );
        }

        this.set('roleFilterContentFiltered', ret);
    }.observes('roleFilterContent.content', 'activeOptionsOnly'),



    accessLevelFilter: null,
    accessLevelContent:null,
    accessLevelContentFiltered:null,

    accessLevelContentObserver:function(){
        var ret = this.get('accessLevelContent.content');

        ret.set('sortProperties', 'title');
        if( this.get('activeOptionsOnly') )//&& ret.get('content') )
        {
            ret = ret.filterProperty('active', true);
        }

//        if( ret.get('content') ){
//            ret = ret.get('content.content');
//        }

        if(ret.get('length'))
        {
            ret.sort(function(a,b) {return (a.get('title') > b.get('title')) ? 1 : ((b.get('title') > a.get('title')) ? -1 : 0);} );
        }

        this.set('accessLevelContentFiltered', ret);
    }.observes('accessLevelContent.content', 'activeOptionsOnly'),



    activeOptionsFilter: function(){
        var tmp = Ember.A([]);

        tmp.pushObject( Ember.Object.create({
            title: "Disabled Options",
            id:1
        }) );

        tmp.pushObject( Ember.Object.create({
            title: "Disabled Users",
            id:2
        }) );

        return tmp;
    }.property(),

    activeOptionsSelection:null,

    activeOptionsOnly:function(){
        return this.get('activeOptionsSelection') === null || this.get('activeOptionsSelection').filterBy('id', 1).get("length") === 0;
    }.property('activeOptionsSelection.@each'),

    activeUsersOnly:function(){
        return this.get('activeOptionsSelection') === null || this.get('activeOptionsSelection').filterBy('id', 2).get("length") === 0;
    }.property('activeOptionsSelection.@each'),

    sortProperties: ['groupAssociation'],




    FilterChangeObserver:function(){
        var filteredContent = this.get('unfilteredModel').get('content');

        if( this.get('activeUsersOnly') )
        {
            filteredContent = filteredContent.filterProperty('active', true);
        }

        if( this.get('groupFilter.length') > 0 )
        {
              filteredContent = filteredContent.filter(this.groupFilterFunction, this);
        }else{
//            this.set('content', this.get('unfilteredModel.content'));
        }

        if( this.get('roleFilter.length') > 0 )
        {
            filteredContent = filteredContent.filter(this.roleFilterFunction, this);
        }else{
//            this.set('content', this.get('unfilteredModel.content'));
        }

        if( this.get('accessLevelFilter.length') > 0 )
        {
            filteredContent = filteredContent.filter(this.accessLevelFilterFunction, this);
        }else{
//            this.set('content', this.get('unfilteredModel.content'));
        }
/*
        if( this.get('roleFilter.length') + this.get('groupFilter.length') === 0 )
        {
            this.set('content', this.get('unfilteredModel.content'));
        }
*/

        if( this.get('nameSearchValue') !== "" && this.get('nameSearchValue') !== null )
        {
            filteredContent = filteredContent.filter(function(item, index, enumerable){
                    return item.get('name') && item.get('name').search(this.get('nameSearchValue')) > -1;
                }, this);
        }

        if(filteredContent)
        {
            filteredContent.sort(function(a,b) {return (a.get('name') > b.get('name')) ? 1 : ((b.get('name') > a.get('name')) ? -1 : 0);} );
        }

        this.set('content', filteredContent);

    }.observes('groupFilter.@each', 'roleFilter.@each', 'accessLevelFilter.@each', 'nameSearchValue', 'activeUsersOnly'),

    groupFilterFunction:function(item, index, enumberable){
        var ret = false;
        this.get('groupFilter').forEach(function(rItem){
            ret = item.get('groupAssociation').contains(rItem);
            if(ret)
            {
                return ret;
            }
        });

        return ret;
//        return this.get('groupFilter').contains( item.get('groupAssociation') );
    },

    roleFilterFunction:function(item, index, enumberable){
        var ret = false;
        this.get('roleFilter').forEach(function(rItem){
            ret = item.get('jobRole_ids').contains(rItem);
            if(ret)
            {
                return ret;
            }
        });

        return ret;
    },

    accessLevelFilterFunction:function(item, index, enumberable){
        var ret = false;
        this.get('accessLevelFilter').forEach(function(rItem){
            ret = item.get('accessLevels').contains(rItem);
            if(ret)
            {
                return ret;
            }
        });

        return ret;
    }
});