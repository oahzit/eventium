Template.attendeePage.helpers({
  attendees: function() {
  	var eventId = Session.get('activeEventId')
  	if (!eventId)
	    return Attendees.find({eventId: this._id});
	else {
		return Attendees.find({eventId: eventId});
	}
  },
  event: function() {
  	var eventId = Session.get('activeEventId')
  	if (!eventId)
	    return Events.find({eventId: this._id});
	else {
		return Events.find({eventId: eventId});
  	}
  },
  activeEventId: function() {
  	return Session.get('activeEventId')
  },
  title: function() {
  	var eventId = Session.get('activeEventId')
  	if (!eventId)
	    var event = Events.findOne(this._id);
	else
		var event = Events.findOne(eventId);
	return event.title;
  }
});

Template.attendeePage.events({
	'click .close': function(e) {
		Session.set('activeEventId', '')
		Session.set('viewAttendees', '')
	},
	'click .js-cancel': function(e) {
		Session.set('activeEventId', '')
		Session.set('viewAttendees', '')
	}
})