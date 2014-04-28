Template.eventCreate.helpers({
  filename: function() {
    var InkBlob = Session.get('InkBlob')
    if (InkBlob) {
      return InkBlob.filename;
    }
    return "Our default placeholder..."
  }
});

Template.eventCreate.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var InkBlob = Session.get('InkBlob');
    if (InkBlob) {
      var photoURL = InkBlob.url;
      var photoFile = InkBlob.filename;
    }
    else {
      var photoURL = '';
      var photoFile = 'Our default placeholder...';
    }

    var event = {
      title: $(e.target).find('[name=title]').val(),
      date: $(e.target).find('[name=date]').val(),
      time: $(e.target).find('[name=time]').val(),
      description: $(e.target).find('[name=description]').val(),
      location: $(e.target).find('[name=location]').val(),
      occasionId: template.data._id,
      photoFile: photoFile,
      photoURL: photoURL
    }
    Meteor.call('createEvent', event, function(error, id) {
      if (error)
        return alert(error.reason);
      Session.set('create', '')
      Session.set('occasionId', '')
      Session.set('InkBlob', '')
    });
  },
  'click .js-cancel': function() {
      Session.set('create', '')
      Session.set('occasionId', '')
  },
  'click .close': function() {
    Session.set('create', '')
    Session.set('occasionId', '')
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

Template.eventCreate.rendered = function(template) {
  //console.log('occasionid', this._id)
  var occasionId = Session.get('occasionId');
  var occasionDate = Occasions.findOne(occasionId).unixDate
  var startDate = occasionDate.getMonth() + 1 + '/' + '01' + '/' + occasionDate.getFullYear()

  $('#date').datepicker({
    autoclose: true,
    startView: startDate
  });
  $('#time').timepicker({
    'scrollDefaultNow': true
  });

}