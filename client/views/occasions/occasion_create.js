Template.occasionCreate.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var occasion = {
      title: $(e.target).find('[name=title]').val(),
      startDate: $(e.target).find('[name=start]').val(),
      endDate: $(e.target).find('[name=end]').val(),
      description: $(e.target).find('[name=description]').val()
    }
    
    Meteor.call('occasion', occasion, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        
        if (error.error === 302)
          Router.go('occasionPage', {_id: error.details})
      } else {
        Router.go('occasionPage', {_id: id});
        Session.set('createOccasion', '')
      }
    });
  },
  'click .js-cancel': function(e) {
    e.preventDefault();
    Session.set('createOccasion', '')
  },
  'click .close': function(e) {
    e.preventDefault();
    Session.set('createOccasion', '');
  }
});

Template.occasionCreate.rendered = function() {
  $('.input-daterange').datepicker({
    autoclose: true
  });
}