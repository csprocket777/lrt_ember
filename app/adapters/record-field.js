import ApplicationAdapter from "appkit/adapters/application";

export default ApplicationAdapter.extend({
  find: function(store, type, id) {
    var recordIsLoaded = store.recordIsLoaded(type, id);

    if (recordIsLoaded) {
      var fakeResponse = {record_field: record.toJSON()};
      console.log(fakeResponse);
      debugger;
      return Ember.RSVP.resolve(fakeResponse);
    } else {
      return this._super(store, type, id);
    }
  }
});