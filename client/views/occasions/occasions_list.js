Template.occasionsList.helpers({
  occasions: function() {
    return Occasions.find({}, {sort: {unixDate: 1}});
  },
  createOccasion: function() {
  	return Session.get('createOccasion')
  },
  editOccasion: function() {
  	return Session.get('editOccasion')
  },
  occasionCount: function() {
    return Occasions.find().count();
  }
});

Template.occasionsList.events({
	'click .js-createoccasion': function(e) {
		e.preventDefault();
		Session.set('createOccasion', 'create')
	}
})