Template.carouselPage.rendered = function(template) {
	$('.carousel').carousel();
}

Template.carouselPage.helpers({
	createAccount: function() {
		return Session.get('create-account');
	}
});

Template.carouselPage.events({
	'click .js-newaccount': function() {
		Session.set('create-account', 'true');
	},
	'click .js-examples': function() {
		Router.go('samples')
	}
});