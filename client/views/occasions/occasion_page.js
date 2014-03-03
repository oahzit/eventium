Template.occasionPage.helpers({
  events: function() {
    return Events.find({occasionId: this._id}, {sort: {unixDate: 1}});
  },
  activeEventId: function () {
  	return Session.get('activeEventId')
  },
  confirm: function () {
  	return Session.get('confirm')
  },
  editEvent: function () {
  	return Session.get('editEvent')
  },
  editOccasion: function() {
  	return Session.get('editOccasion')
  },
  createOccasion: function() {
  	return Session.get('createOccasion')
  },
  viewAttendees: function() {
  	return Session.get('viewAttendees')
  },
  ownOccasion: function() {
  	return this.userId == Meteor.userId();
  },
  createEvent: function() {
  	return Session.get('create');
  },
  unjoin: function() {
    return Session.get('unjoin');
  }
});

Template.occasionPage.events({
	'click .js-create': function() {
    Session.set('create', 'create')
    Session.set('occasionId', this._id)
  }
})