var TDD = {};

(function() {
  TDD.init = function(dom, data) {
    var model = TDD.model(data);
    var view = TDD.view(dom, model).bind();
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
    var food = map({'': []}).merge(data);
    var selectedType = '';
    var self = {
      types: food.keys(),
      onChange: function () { /* abstract */ },
      foods: function() { return food[selectedType]; },
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

  function map(initial) {
    var internalKeys = [];
    var self = {
      merge: function(data) {
        for (var key in data) {
          self[key] = data[key];
        }
        return self;
      },
      keys: function() {
        var keys = [];
        for (var key in self) {
          if (!internalKeys.contains(key)) keys.push(key);
        }
        return keys;
      }
    };
    for (var key in self) internalKeys.push(key);
    self.merge(initial);
    return self;
  }
})();
