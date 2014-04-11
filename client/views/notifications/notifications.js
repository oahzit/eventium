Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notifications.events({
    'click .js-clearNew': function() {
      // find all unread notifications belonging to a particular user and mark them all as read
      var userId = Meteor.userId;
      var notifs = Notifications.find({userId: Meteor.userId(), read: false});
      notifs.forEach( function(notification) {
        Notifications.update(notification._id, {$set: {read: true}});
      });
  }
});

Template.notification.helpers({
  notificationEventPath: function() {
    return Router.routes.attendeePage.path({_id: this.eventId});
  }
});

Template.notification.events({
  'click .js-notification': function() {
      Notifications.update(this._id, {$set: {read: true}});
  }
});