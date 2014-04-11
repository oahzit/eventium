Template.header.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current().route.name === name
    });
    
    return active && 'active';
  },
  regNavbar: function() {
    if (Router.current()){
      console.log('route', Router.current().route.name)
      if (Router.current().route.name == "occasionsList" && this.userId == Meteor.userId()){
        return false
      }
      else
        return true
    }    
  }
});

Template.header.events({
	'click .js-createoccasion': function(e) {
		e.preventDefault();
		Session.set('createOccasion', 'create')
	}
})