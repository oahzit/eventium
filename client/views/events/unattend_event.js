Template.unattendEvent.events({
  'click .js-unattend': function() {
    var joinedEvents = Session.get('joinedEvents');
    var eventId = Session.get('activeEventId');
    var attendeeId = joinedEvents[eventId];
    Attendees.remove({_id: attendeeId});
    delete joinedEvents[eventId];
   
    Session.set('joinedEvents', joinedEvents)
   	Session.set('activeEventId', '');
  	Session.set('unjoin', '');
  },
  'click .js-cancel': function() {
  	Session.set('activeEventId', '');
  	Session.set('unjoin', '');
  }
});