Template.unattendEvent.helpers({
  eventName: function() {
    var attendeeId = this._id;
    var attendee = Attendees.findOne(attendeeId);

    var eventId = attendee.eventId;
    var eventInfo = Events.findOne(eventId);
    var eventName = eventInfo.title;

    return eventName
  },
  hasLeft: function() {
    return Session.get('hasLeft')
  }
});

Template.unattendEvent.events({
  'click .js-unattend': function() {
    var joinedEvents = JSON.parse(ReactiveCookie.get('joinedEvents'));
    var attendeeId = this._id;
    var attendee = Attendees.findOne(attendeeId);
    var eventId = attendee.eventId;
    var eventInfo = Events.findOne(eventId)
    var occasionId = eventInfo.occasionId;

    Attendees.remove({_id: attendeeId});
    delete joinedEvents[eventId];
   
    ReactiveCookie.set('joinedEvents', JSON.stringify(joinedEvents));
    Session.set('hasLeft', true)
    Session.set('occasionId', occasionId)
  },
  'click .js-cancel': function() {
    var attendeeId = this._id;
    var attendee = Attendees.findOne(attendeeId);
    var eventId = attendee.eventId;
    var eventInfo = Events.findOne(eventId)
    var occasionId = eventInfo.occasionId;

    Router.go('occasionPage', {_id: occasionId})
  }
});
