Template.occasion.events({
	'click .js-editOccasion': function() {
		Session.set('activeOccasion', this._id);
		Session.set('editOccasion', 'edit')
	}
})