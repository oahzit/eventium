Template.unattendEvent.events({
  'click .js-unattend': function() {
    var joinedEvents = JSON.parse(ReactiveCookie.get('joinedEvents'));
    var eventId = Session.get('activeEventId');
    var attendeeId = joinedEvents[eventId];
    Attendees.remove({_id: attendeeId});
    delete joinedEvents[eventId];
   
    ReactiveCookie.set('joinedEvents', JSON.stringify(joinedEvents));
   	Session.set('activeEventId', '');
  	Session.set('unjoin', '');
  },
  'click .js-cancel': function() {
  	Session.set('activeEventId', '');
  	Session.set('unjoin', '');
  }
});