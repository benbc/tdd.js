function model(data) {
  var self = {
    foods: [],
    select: function(type) {
      self.foods = pick(type);
    }
  };
  function pick(type) {
    return (type === '') ? [] : data[type];
  }
  return self;
}

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

function controller(model, view) {
  view.onTypeSelected = function(type) {
    model.select(type);
  };
}

function init() {
  view(jQuery('form'));
}
