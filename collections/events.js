Events = new Meteor.Collection('events');

Meteor.methods({
	createEvent: function(eventAttributes) {
		var user = Meteor.user();
		var occasion = Occasions.findOne(eventAttributes.occasionId);

		if (!user)
			throw new Meteor.error(401, "You need to login to create an event")

		if(!eventAttributes.title)
			throw new Meteor.error(422, "Please give your event a name")

		if(!occasion)
			throw new Meteor.Error(422, "Events have to be created as part of an occasion")
		var d = new Date(eventAttributes.date + ' ' + eventAttributes.time)
		var event = _.extend(_.pick(eventAttributes, 'title', 'date', 'time', 'description', 'location', 'occasionId',
				'photoURL', 'photoFile'), {
			userId: user._id,
			unixDate: new Date(eventAttributes.date + ' ' + eventAttributes.time)
		});

		var eventId = Events.insert(event);

		return eventId;
	},

	joinEvent: function(attendeeAttributes, currentEventId) {
		if(!attendeeAttributes.name)
			throw new Meteor.Error(422, "Please enter your name");

		if(!attendeeAttributes.email)
			throw new Meteor.Error(422, 'Please enter an email address');

		// add attendee to attendees collection
		var attendee = createEventAttendee(currentEventId, attendeeAttributes);
		console.log('attendee', attendee)

		// create a new notification
		createEventNotification(currentEventId, attendeeAttributes);

		/*
		if(attendeeAttributes.message){
			// create a new inbox notification if there's a message
			createInboxNotification(currentEventId, attendeeAttributes);
		}
		*/
		return attendee
	},
	
	sendEmail: function (to, from, subject, text) {
    	check([to, from, subject, text], [String]);
    	console.log('email send called')
	    // Let other method calls from the same client start running,
	    // without waiting for the email sending to complete.
	    this.unblock();

	    Email.send({
	      to: to,
	      from: from,
	      subject: subject,
	      text: text
	    });
  }
});