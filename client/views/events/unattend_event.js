Template.unattendEvent.events({
  'click a': function() {
    console.log(this._id)
    Attendees.remove({_id: this._id});
  }
});