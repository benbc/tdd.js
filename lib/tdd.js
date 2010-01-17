var TDD = {};

(function() {
  function keys(map) {
    var keys = [];
    for (var key in map) keys.push(key);
    return keys;
  }

  TDD.model = function(data) {
    var selectedType = '';
    var self = {
      types: keys(data),
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
  };

  TDD.view = function(dom, model) {
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
    var types = dom.find('.food-type');
    types.empty();
    model.types.each(function(t) {
      jQuery('<option>').text(t).appendTo(types);
    });
    types.change(function() {
      self.onTypeSelected(dom.find('[selected]').val());
    });
    return self;
  };

  TDD.controller = function(model, view) {
    view.onTypeSelected = function(type) {
      model.select(type);
    };
    model.onChange = function() {
      view.modelChanged();
    };
  };

  TDD.init = function(data) {
    var model = TDD.model(data);
    var view = TDD.view(jQuery('form'), model);
    TDD.controller(model, view);
  };
})();
