Messages = new Meteor.Collection('messages');

Messages.allow({
  update: ownsDocument
});

createInboxNotification = function(eventId, newAttendee) {
  var event = Events.findOne(eventId);
  Messages.insert({
    userId: event.userId,
    eventId: event._id,
    attendeeName: newAttendee.name,
    eventName: event.title,
    read: false
  });
};