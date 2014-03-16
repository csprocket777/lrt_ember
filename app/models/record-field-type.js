/**
 * Created by chshipma on 2/20/14.
 */
export default DS.Model.extend({
    data_label:             DS.attr('string'),
    data_type:              DS.attr('string'),
    active:                 DS.attr('boolean'),
    updated_at:             DS.attr(),
    created_at:             DS.attr()
});