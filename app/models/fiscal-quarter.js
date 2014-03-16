/**
 * Created by chshipma on 10/3/13.
 */
export default DS.Model.extend({
   qtrID:       DS.attr('string'),
   startDate:   DS.attr('string'),
   endDate:     DS.attr('string'),
   fiscalYear:  DS.attr('number'),

   startDateString: function(){
       return moment(this.get('startDate')).format("YYYY-MM-DD");
   }.property('startDate'),

    endDateString: function(){
        return moment(this.get('endDate')).format("YYYY-MM-DD");
    }.property('endDate')
});