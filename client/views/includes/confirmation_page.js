Template.confirmationPage.helpers({
  eventTitle: function() {
  	var eventId = Session.get('activeEventId')
  	var activeEvent = Events.findOne(eventId)
  	return activeEvent.title;
  },
  eventDate: function() {
  	var eventId = Session.get('activeEventId')
  	var activeEvent = Events.findOne(eventId)
  	return activeEvent.date;
  }
});

Template.confirmationPage.events({
  'click a': function() {
  	Session.set('activeEventId', '')
  	Session.set('confirm', '')
  }
});