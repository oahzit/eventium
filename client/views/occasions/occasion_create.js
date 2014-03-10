Template.occasionCreate.helpers({
  filename: function() {
    var InkBlob = Session.get('InkBlob')
    if (InkBlob) {
      return InkBlob.filename;
    }
    return "Our default placeholder..."
  }
});

Template.occasionCreate.events({
  'submit form': function(e) {
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
    var occasion = {
      title: $(e.target).find('[name=title]').val(),
      startDate: $(e.target).find('[name=start]').val(),
      endDate: $(e.target).find('[name=end]').val(),
      description: $(e.target).find('[name=description]').val(),
      photoURL: photoURL,
      photoFile: photoFile
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
        Session.set('InkBlob', '')
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

Template.occasionCreate.rendered = function() {
  $('.input-daterange').datepicker({
    autoclose: true
  });
}