function view(dom) {
  var self = {
    onTypeSelected: function() { /* abstract */ },
    modelChanged: function() {}
  };
  dom.find('.food-type').change(function() {
    self.onTypeSelected(dom.find('[selected]').val());
  });
  return self;
}

function init() {
  view(jQuery('form'));
}
