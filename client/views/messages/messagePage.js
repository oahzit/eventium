Template.messagePage.helpers({
  attendees: function() {
    return Attendees.find({eventId: this._id});
  },
  event: function() {
  	return Events.find({_id: this._id});
  }
});