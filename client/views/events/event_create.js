Template.eventCreate.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var event = {
      title: $(e.target).find('[name=title]').val(),
      date: $(e.target).find('[name=date]').val(),
      time: $(e.target).find('[name=time]').val(),
      description: $(e.target).find('[name=description]').val(),
      location: $(e.target).find('[name=location]').val(),
      occasionId: template.data._id
    }
    Meteor.call('createEvent', event, function(error, id) {
      if (error)
        return alert(error.reason);
      Session.set('create', '')
      Session.set('occasionId', '')
    });
  },
  'click .js-cancel': function() {
      Session.set('create', '')
      Session.set('occasionId', '')
  },
  'click .close': function() {
    Session.set('create', '')
    Session.set('occasionId', '')
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
    minuteStep: 30,
    defaultTime: '07:00 PM',
    template: 'dropdown'
  });
}