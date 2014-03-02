Template.eventEdit.helpers({
  title: function() {
    var eventId = Session.get('activeEventId')
    var activeEvent = Events.findOne(eventId)
    return activeEvent.title;
  },
  date: function() {
    var eventId = Session.get('activeEventId')
    var activeEvent = Events.findOne(eventId)
    return activeEvent.date;
  },
  description: function() {
    var eventId = Session.get('activeEventId')
    var activeEvent = Events.findOne(eventId)
    return activeEvent.description;
  },
  location: function() {
    var eventId = Session.get('activeEventId')
    var activeEvent = Events.findOne(eventId)
    return activeEvent.location;
  }
});

Template.eventEdit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var eventId = Session.get('activeEventId')

    var eventProperties = {
      title: $(e.target).find('[name=title]').val(),
      date: $(e.target).find('[name=date]').val(),
      description: $(e.target).find('[name=description]').val(),
      location: $(e.target).find('[name=location]').val(),
      time: $(e.target).find('[name=time]').val(),
      occasionId: template.data._id
    }
    Events.update(eventId, {$set: eventProperties}, function(error) {
      if (error)
        throwError(error.reason);
      else {
        Session.set('editEvent', '')
        Session.set('activeEventId', '')
      }
    });
  },
  'click .js-delete': function() {
      if (confirm("Delete this event?")) {
        var eventId = Session.get('activeEventId');
        Events.remove({_id: eventId})
        Session.set('editEvent', '')
        Session.set('activeEventId', '')
      }
    },
  'click .js-cancel': function() {
    Session.set('editEvent', '')
    Session.set('activeEventId', '')
  },
  'click .close': function() {
    Session.set('editEvent', '')
    Session.set('activeEventId', '')
  }
});

Template.eventEdit.rendered = function() {
  var eventId = Session.get('activeEventId')
  var activeEvent = Events.findOne(eventId)
  var time = activeEvent.time;

  $('#date').datepicker({
    autoclose: true
  });
  $('#time').timepicker({
    minuteStep: 30,
    defaultTime: time
  });
}