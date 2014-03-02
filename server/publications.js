Meteor.publish('occasions', function(userId) {
  return Occasions.find({userId: this.userId});
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
	return Attendees.find({occasionId: occasionId});
});

Meteor.publish('singleAttendee', function(id) {
	return Attendees.find(id);
});