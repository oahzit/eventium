Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument
});

createEventNotification = function(eventId, newAttendee) {
  var event = Events.findOne(eventId);
  console.log(event)
  Notifications.insert({
    userId: event.userId,
    eventId: event._id,
    attendeeName: newAttendee.name,
    eventName: event.title,
    read: false
  });
};