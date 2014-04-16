Template.eventJoin.helpers({
	eventTitle: function() {
		var eventId = Session.get('activeEventId');
		var event = Events.findOne(eventId);
		return event.title;
	}
});

Template.eventJoin.events({
	'submit form': function(e) {
		e.preventDefault();

		var newAttendee = { name: $(e.target).find('[name=name]').val(),
							email: $(e.target).find('[name=email]').val(),
							message: $(e.target).find('[name=message]').val()
						  }
		var eventId = Session.get('activeEventId')

		Meteor.call('joinEvent', newAttendee, eventId, function(error, id) {
			if (error)
				throwError(error.reason);
			else {
				Session.set('confirm', 'confirm')
				var joinedEvents = JSON.parse(ReactiveCookie.get('joinedEvents'));
				
				if (joinedEvents == null)
					joinedEvents = {};

				joinedEvents[eventId] = id;

				ReactiveCookie.set('joinedEvents', JSON.stringify(joinedEvents));
				
				var attendeeEmail = newAttendee['email'];
				Meteor.call('sendEmail',
				            attendeeEmail,
				            'tizhao@gmail.com',
				            'Helloooooo!',
				            'You should be receiving an email with a unique link to unregister from an event. \n But this is what you are getting instead. Because email is not ready yet. Sorry!');
			}
		});
	},
	'click .js-cancel': function() {
  		Session.set('activeEventId', '')
  	}
});