Template.attendees.helpers({
  attendees: function() {
    return Attendees.find({eventId: this._id});
  },
  attendeeCount: function(){
    return Attendees.find({eventId: this._id}).count();
  }
});

Template.attendee.helpers({
  attendeeEventPath: function() {
    return Router.routes.eventPage.path({_id: this._id});
  }
})