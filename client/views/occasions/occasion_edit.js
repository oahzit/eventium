Template.occasionEdit.helpers({
  title: function() {
    var currentOccasionId = this._id;
    if (currentOccasionId == null) {
      currentOccasionId = Session.get('activeOccasion')
    }
    var activeOccasion = Occasions.findOne(currentOccasionId);
    return activeOccasion.title;
  },
  startDate: function() {
    var currentOccasionId = this._id;
    if (currentOccasionId == null) {
      currentOccasionId = Session.get('activeOccasion')
    }
    var activeOccasion = Occasions.findOne(currentOccasionId);
    return activeOccasion.startDate;
  },
  endDate: function() {
    var currentOccasionId = this._id;
    if (currentOccasionId == null) {
      currentOccasionId = Session.get('activeOccasion')
    }
    var activeOccasion = Occasions.findOne(currentOccasionId);
    return activeOccasion.endDate;
  },
  description: function() {
    var currentOccasionId = this._id;
    if (currentOccasionId == null) {
      currentOccasionId = Session.get('activeOccasion')
    }
    var activeOccasion = Occasions.findOne(currentOccasionId);
    return activeOccasion.description;
  }
});

Template.occasionEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentOccasionId = this._id;
    if (currentOccasionId == null) {
      currentOccasionId = Session.get('activeOccasion')
    }

    var start = $(e.target).find('[name=start]').val();
    var unixDate = new Date(start);
    var occasionProperties = {
      title: $(e.target).find('[name=title]').val(),
      startDate: $(e.target).find('[name=start]').val(),
      endDate: $(e.target).find('[name=end]').val(),
      description: $(e.target).find('[name=description]').val(),
      unixDate: unixDate
    }
    
    Occasions.update(currentOccasionId, {$set: occasionProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Session.set('editOccasion', '');
        Session.set('activeOccasion', '');
      }
    });
  },
  
  'click .js-delete': function(e) {
    if (confirm("Delete this occasion?")) {
      var currentOccasionId = this._id;
      if (currentOccasionId == null) {
        currentOccasionId = Session.get('activeOccasion')
      }

      Occasions.remove({_id: currentOccasionId});
      Session.set('editOccasion', '');
      Session.set('activeOccasion', '');
      Router.go('occasionsList');
    }
  },

  'click .js-cancel': function(e) {
    Session.set('editOccasion', '');
    Session.set('activeOccasion', '');
  },
  'click .close': function(e) {
    Session.set('editOccasion', '');
    Session.set('activeOccasion', '');
  }
});

Template.occasionEdit.rendered = function() {
  $('.input-daterange').datepicker({
    autoclose: true
  });
}