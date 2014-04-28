Template.eventJoin.helpers({
	eventTitle: function() {
		var eventId = Session.get('activeEventId');
		var eventInfo = Events.findOne(eventId);
		return eventInfo.title;
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

		Meteor.call('joinEvent', newAttendee, eventId, function(error, attendeeId) {
			if (error)
				throwError(error.reason);
			else {
				Session.set('confirm', 'confirm')
				var joinedEvents = JSON.parse(ReactiveCookie.get('joinedEvents'));
				
				if (joinedEvents == null)
					joinedEvents = {};

				joinedEvents[eventId] = attendeeId;

				ReactiveCookie.set('joinedEvents', JSON.stringify(joinedEvents));
				
				var attendeeEmail = newAttendee['email'];
				var eventInfo = Events.findOne(eventId);
				var eventName = eventInfo.title;
				var eventDate = eventInfo.date;
				var eventTime = eventInfo.time;

				Meteor.call('sendEmail',
				            attendeeEmail,
				            'epicuriouslyti@gmail.com',
				            "You're attending " + eventName,
				            "Hello " + newAttendee.name + "!\n\n"
				            + "Mark your calendar! You're signed up to go to " + eventName
				            + " on " + eventDate + " at " + eventTime + ".\n"
				            + "If you can no longer make it, please [change your RSVP]("
			            	+ Meteor.absoluteUrl('unattend/'+attendeeId) + ").\n"
							+ "Have fun!");
			}
		});
	},
	'click .js-cancel': function() {
  		Session.set('activeEventId', '')
  	}
});