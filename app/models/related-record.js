/**
 * Created by chshipma on 3/6/14.
 */
export default DS.Model.extend({
    record:     DS.belongsTo('Record'),
    updated_at: DS.attr('date'),
    created_at: DS.attr('date')
});