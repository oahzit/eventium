Template.inbox.helpers({
  messages: function() {
    return Messages.find({userId: Meteor.userId(), read: false});
  },
  messageCount: function(){
    return Messages.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.inbox.events({
    'click .js-clearNew': function() {
      // find all unread notifications belonging to a particular user and mark them all as read
      var userId = Meteor.userId;
      var msgs = Messages.find({userId: Meteor.userId(), read: false});
      msgs.forEach( function(message) {
        Messages.update(message._id, {$set: {read: true}});
      });
  }
});

Template.message.helpers({
  messageEventPath: function() {
    return Router.routes.messagePage.path({_id: this.eventId});
  }
});

Template.message.events({
  'click .js-message': function() {
      Messages.update(this._id, {$set: {read: true}});
      console.log('click!')
  }
});