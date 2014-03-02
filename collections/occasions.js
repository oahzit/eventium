Occasions = new Meteor.Collection('occasions');

Occasions.allow({
	update: ownsDocument,
	remove: ownsDocument
});

/*
Occasions.deny({
	update: function(userId, occasion, fieldNames) {
		return(_.without(fieldNames, 'title', 'startDate', 'endDate', 'description').length > 0);
	}
});
*/

Meteor.methods({
	occasion: function(occasionAttributes) {
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error(401, "You need to login to create a new occasion")

		if (!occasionAttributes.title)
			throw new Meteor.Error(422, 'Please give your occasion a title')

		var occasion = _.extend(_.pick(occasionAttributes, 'title', 'description', 'startDate', 'endDate'), {
			userId: user._id,
			unixDate: new Date(occasionAttributes.startDate)
		})
		var occasionId = Occasions.insert(occasion)

		return occasionId;
	}
});