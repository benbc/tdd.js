function model(data) {
  var selectedType = '';
  var self = {
    onChange: function () { /* abstract */ },
    foods: function() { return pick(selectedType); },
    select: function(type) {
      if (type === selectedType) return;
      selectedType = type;
      self.onChange();
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
      model.foods().each(function(f) {
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
  model.onChange = function() {
    view.modelChanged();
  };
}

function init() {
  var m = model({'Meat': [1, 2, 3], 'Cheese': [4, 5, 6]});
  var v = view(jQuery('form'), m);
  controller(m, v);
}
