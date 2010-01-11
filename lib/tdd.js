function view(dom) {
  var self = {
    onTypeSelected: function() { /* abstract */ }
  };
  dom.find('.food-type').change(function() {
    self.onTypeSelected();
  });
  return self;
}

function init() {
  view(jQuery('form'));
}
