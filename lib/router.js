Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
    return [
    	Meteor.subscribe('notifications'),
    	Meteor.subscribe('messages')
    	]
  }
});

Router.map(function() {
	this.route('occasionsList', {
		path: '/',
		waitOn: function() {
			return Meteor.subscribe('occasions')
		}
	});
	this.route('samples', {
		path: '/samples',
		waitOn: function() {
			return Meteor.subscribe('sampleOccasions')
		}
	});
	this.route('occasionPage', {
		path: '/occasions/:_id',
		waitOn: function() {
			return [
				Meteor.subscribe('singleOccasion', this.params._id),
				Meteor.subscribe('events', this.params._id),
				Meteor.subscribe('attendeesByOccasion', this.params._id)
			];
		},
		data: function() { return Occasions.findOne(this.params._id); }
	});
	this.route('occasionEdit', {
		path: '/occasions/:_id/edit',
		waitOn: function() { 
			Meteor.subscribe('singleOccasion', this.params._id);
		},
		data: function() { return Occasions.findOne(this.params._id); }
	});
	this.route('occasionCreate', {
		path: '/create_occasion',
		disableProgress: true
	});

	this.route('eventCreate', {
		path: '/occasions/:_id/create_event/',
		waitOn: function() {
			Meteor.subscribe('singleOccasion', this.params._id);
		},
		data: function() { return Occasions.findOne(this.params._id); }
	});
	this.route('eventPage', {
		path: '/events/:_id',
		waitOn: function() {
			return [
				Meteor.subscribe('singleEvent', this.params._id),
				Meteor.subscribe('attendees', this.params._id)
				];
		},
		data: function() { return Events.findOne(this.params._id); }
	});
	this.route('eventEdit', {
		path: '/events/:_id/edit',
		waitOn: function() {
			Meteor.subscribe('singleEvent', this.params._id);
		},
		data: function() { return Events.findOne(this.params._id); }
	});
	this.route('eventJoin', {
		path: 'events/:_id/join',
		waitOn: function() {
			return [
				Meteor.subscribe('singleEvent', this.params._id),
				Meteor.subscribe('attendees', this.params._id)
			];
		},
		data: function() { return Events.findOne(this.params._id); }
	});
	this.route('confirmationPage', {
		path: '/confirm_join/:_id',
		waitOn: function() {
			Meteor.subscribe('singleEvent', this.params._id);
		},
		data: function() { return Events.findOne(this.params._id); }
	});
	this.route('attendeePage', {
		path: '/events/:_id/attendees',
		waitOn: function() {
			return [
				Meteor.subscribe('singleEvent', this.params._id),
				Meteor.subscribe('attendees', this.params._id)
				];
		},
		data: function() { return Events.findOne(this.params._id); }
	});
	this.route('messagePage', {
		path: '/events/:_id/messages',
		waitOn: function() {
			return [
				Meteor.subscribe('singleEvent', this.params._id),
				Meteor.subscribe('attendees', this.params._id)
				];
		},
		data: function() { return Events.findOne(this.params._id); }
	});
	this.route('unattendEvent', {
		path: '/attendees/:_id/unattend',
		waitOn: function() {
			return	Meteor.subscribe('singleAttendee', this.params._id)
		},
		data: function() { return Attendees.findOne(this.params._id); }
	});
	this.route('loginPage', {
		path: '/create-account'
	});
	this.route('contactForm', {
		path: '/contact'
	});
	this.route('confirmContact', {
		path: '/thankyou'
	});

});

Router.onBeforeAction('loading');