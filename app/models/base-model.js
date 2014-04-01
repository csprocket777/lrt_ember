/**
 * Created by chshipma on 2/22/14.
 */
export default DS.Model.extend({
    propertiesToWatch:      DS.attr(),
    updated_at: DS.attr(),
    created_at: DS.attr(),

    modelIsDirty:   DS.attr('boolean', {default: false}),

    relationshipWatchList: [],

    relationshipWatcherSetup: function(){
        this.get('relationshipWatchList').forEach(function(item,index,enumerable){
            this.addObserver(item, this, "changeObserver");
        }, this);
    }.on('init'),

    changeObserver: function(){
        if( this.get('isDeleted') === false )
        {
            var isDirty = this.get('relationshipWatchList').any(function(item,index,enumerable){
                return this.get(item) !== this.get('_data')[item];
            }, this);
            this.set('modelIsDirty', isDirty );
        }
    }
});