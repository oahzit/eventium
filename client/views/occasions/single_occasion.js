Template.singleOccasion.helpers({
  ownOccasion: function() {
    return this.userId == Meteor.userId();
  },
  create: function() {
  	return Session.get('create')
  }
});
Template.singleOccasion.events({
  'click .js-edit': function() {
    Session.set('editOccasion', 'edit')
  }
});