Template.singleOccasion.helpers({
  ownOccasion: function() {
    return this.userId == Meteor.userId();
  },
  create: function() {
  	return Session.get('create')
  },
	photo: function() {
		var occasion = Occasions.findOne(this._id);
		var photoPath = occasion.photoURL;

		if (photoPath) {
			return photoPath;
		}

		photoPath = '/eventium_default.jpg';
		return photoPath;
	}
});
Template.singleOccasion.events({
  'click .js-edit': function() {
    Session.set('editOccasion', 'edit')
  }
});