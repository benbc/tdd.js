var TDD = {};

(function() {
  TDD.init = function(data) {
    var model = TDD.model(data);
    var view = TDD.view(jQuery('form'), model);
    TDD.controller(model, view);
  };

  TDD.controller = function(model, view) {
    view.onTypeSelected = function(type) {
      model.select(type);
    };
    model.onChange = function() {
      view.modelChanged();
    };
  };

  TDD.model = function(data) {
    var selectedType;
    var self = {
      types: keys(data),
      onChange: function () { /* abstract */ },
      foods: function() { return data[selectedType]; },
      select: function(type) {
        if (type === selectedType) return;
        selectedType = type;
        self.onChange();
      }
    };
    return self;
  };

  TDD.view = function(dom, model) {
    var foods = dom.find('.food');
    var types = dom.find('.food-type');
    var self = {
      onTypeSelected: function() { /* abstract */ },
      bind: function() {
        enterTypes();
        setUpChangeHandler();
        return self;
      },
      modelChanged: function() {
        updateFoods();
      }
    };
    function setUpChangeHandler() {
      types.change(function() {
        self.onTypeSelected(dom.find('[selected]').val());
      });
    }
    function updateFoods() { refillOptions(foods, model.foods()); }
    function enterTypes() { refillOptions(types, model.types); }
    function refillOptions(select, options) {
      select.empty();
      options.each(function(o) {
        jQuery('<option>').text(o).appendTo(select);
      });
    }
    return self;
  };

  function keys(map) {
    var keys = [];
    for (var key in map) keys.push(key);
    return keys;
  }
})();
