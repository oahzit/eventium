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
  },
  filename: function() {
    var eventId = Session.get('activeEventId')
    var activeEvent = Events.findOne(eventId)
    
    if (Session.get('InkBlob')) {
      var InkBlob = Session.get('InkBlob');
      return InkBlob.filename;
    }
    return activeEvent.photoFile;
  }
});

Template.eventEdit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var eventId = Session.get('activeEventId')

    if (Session.get('InkBlob')) {
      var photoFile = InkBlob.filename;
      var photoURL = InkBlob.url;
    }
    else {
      var activeEvent = Events.findOne(eventId);
      var photoURL = activeEvent.photoURL;
      var photoFile = activeEvent.photoFile;
    }

    var eventProperties = {
      title: $(e.target).find('[name=title]').val(),
      date: $(e.target).find('[name=date]').val(),
      description: $(e.target).find('[name=description]').val(),
      location: $(e.target).find('[name=location]').val(),
      time: $(e.target).find('[name=time]').val(),
      occasionId: template.data._id,
      photoFile: photoFile,
      photoURL: photoURL
    }

    Events.update(eventId, {$set: eventProperties}, function(error) {
      if (error)
        throwError(error.reason);
      else {
        Session.set('editEvent', '')
        Session.set('activeEventId', '')
        Session.set('InkBlob', '')
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
  },
  'click .js-addPhoto': function(e) {
    e.preventDefault();
    filepicker.setKey('A7F2pfPuBSEKNV5MFKg37z');
    filepicker.pick({
    mimetypes: ['image/*'],
    container: 'modal',
    services:['COMPUTER', 'URL', 'FACEBOOK', 'INSTAGRAM', 'PICASA']
    },
      function(InkBlob){
        console.log(JSON.stringify(InkBlob));
        console.log(InkBlob.url)
        Session.set('InkBlob', InkBlob)
      },
      function(FPError){
        console.log(FPError.toString());
      }
    );
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