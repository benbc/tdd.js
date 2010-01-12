function view(dom, model) {
  var self = {
    onTypeSelected: function() { /* abstract */ },
    modelChanged: function() {
      var foods = dom.find('.food');
      foods.empty();
      model.foods.each(function(f) {
        jQuery('<option>').text(f).appendTo(foods);
      });
    }
  };
  dom.find('.food-type').change(function() {
    self.onTypeSelected(dom.find('[selected]').val());
  });
  return self;
}

function init() {
  view(jQuery('form'));
}
