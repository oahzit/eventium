Template.event.helpers({
	ownEvent: function() {
		return this.userId == Meteor.userId();
	},
	alreadyJoined: function() {
		
		var joinedEvents = JSON.parse(ReactiveCookie.get('joinedEvents'));
		var eventId = this._id;

		if (joinedEvents != null) {
			var hasJoined = eventId in joinedEvents;
			return hasJoined;
		}
		return false
	},
	notificationEventPath: function() {
   		return Router.routes.attendeePage.path({_id: this._id});
  	},
  	photo: function() {
  		var event = Events.findOne(this._id);
  		var photoPath = event.photoURL;

  		if (photoPath) {
  			return photoPath;
  		}

  		var rand = Math.floor(Math.random()*3 + 1);
  		photoPath = '/event_default' + rand + '.jpg';
  		return photoPath;
  	}
});

Template.event.events({
	'click .js-join': function(e) {
		e.preventDefault();
		var eventId = this._id;
		Session.set('activeEventId', eventId);
	},
	'click .js-unjoin': function(e) {
		e.preventDefault();
		var eventId = this._id;
		Session.set('activeEventId', eventId);
		Session.set('unjoin', 'true')		
	},
	'click .js-edit': function(e) {
		e.preventDefault();

		var eventId = this._id;
		Session.set('activeEventId', eventId);
		Session.set('editEvent', 'editing')
	},
	'click .js-attendees': function(e) {
		e.preventDefault();

		var eventId = this._id;
		Session.set('activeEventId', eventId);
		Session.set('viewAttendees', 'viewing')
	}
});