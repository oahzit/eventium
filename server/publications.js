Meteor.publish('occasions', function(userId) {
  return Occasions.find({userId: this.userId});
});

Meteor.publish('eventNameAndOccasionId', function() {
  return Events.find({}, {fields: {title: 1, occasionId: 1} });
});

Meteor.publish('sampleOccasions', function() {
	return Occasions.find({isSample: true});
});

Meteor.publish('singleOccasion', function(id) {
  return id && Occasions.find(id);
});

Meteor.publish('events', function(occasionId) {
  return Events.find({occasionId: occasionId});
});

Meteor.publish('singleEvent', function(id) {
  return id && Events.find(id);
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('messages', function() {
  return Messages.find({userId: this.userId});
});

Meteor.publish('attendees', function(eventId) {
  return Attendees.find({eventId: eventId});
});

Meteor.publish('attendeesByOccasion', function(occasionId) {
	var occasion = Occasions.findOne(occasionId)
	if (this.userId == occasion.userId) {
		return Attendees.find({occasionId: occasionId});
	}
	else {
		return Attendees.find({occasionId: occasionId},
		{fields: {attendeeName: 1, eventId: 1} })
	}
});

Meteor.publish('singleAttendee', function(id) {
	return Attendees.find(id);
});

Meteor.publish('attendeeNamesByOccasion', function(occasionId) {
	return Attendees.find({occasionId: occasionId},
		{fields: {attendeeName: 1, eventId: 1} })
})