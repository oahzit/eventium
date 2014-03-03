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
				var joinedEvents = Session.get('joinedEvents');
				
				if (joinedEvents == null)
					joinedEvents = {};

				joinedEvents[eventId] = id;

				Session.set('joinedEvents', joinedEvents)
				console.log(joinedEvents)
				
				var attendeeEmail = newAttendee['email'];
				Meteor.call('sendEmail',
				            attendeeEmail,
				            'tiz@example.net',
				            'Hello from Meteor!',
				            'This is a test of Email.send.');
			}
		});
	},
	'click a': function() {
  		Session.set('activeEventId', '')
  	}
});