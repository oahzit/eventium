Template.occasion.helpers({
  	photo: function() {
		var occasion = Occasions.findOne(this._id);
		var photoPath = occasion.photoURL;

		if (photoPath) {
			return photoPath;
		}

		photoPath = '/eventium_default.jpg';
		return photoPath;
	},
	ownOccasion: function() {
    return this.userId == Meteor.userId();
  }
})
Template.occasion.events({
	'click .js-editOccasion': function() {
		Session.set('activeOccasion', this._id);
		Session.set('editOccasion', 'edit')
	}
})