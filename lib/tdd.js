var TDD = {};

(function() {
  TDD.model = function(data) {
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
  };

  TDD.view = function(dom, model) {
    var self = {
      onTypeSelected: function() { /* abstract */ },
      modelChanged: function() {
        model.types.each(function(t) {
          dom.find('.food-type').append(jQuery('<option>').text(t));
        });
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
