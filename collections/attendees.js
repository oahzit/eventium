Attendees = new Meteor.Collection('attendees');

createEventAttendee = function(eventId, newAttendee) {
	var event = Events.findOne(eventId);
	var attendee = Attendees.insert({
		eventId: eventId,
		attendeeName: newAttendee.name,
		attendeeEmail: newAttendee.email,
		occasionId: event.occasionId,
		attendeeMessage: newAttendee.message
	});
	return attendee
};