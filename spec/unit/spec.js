describe('tdd.js', function() {
  describe('view', function() {
    var dom;
    before_each(function() {
      dom = jQuery('<form>'
                 + '  <select class="food-type">'
                 + '    <option selected="selected">Meat</option>'
                 + '  </select>'
                 + '  <select class="food">'
                 + '    <option>Pate de Campagne</option>'
                 + '  </select>'
                 + '</form>');
    });

    it('populates the types from the model', function() {
      var model = { types: ['Meat', 'Cheese'], foods: function() { return []; } };
      TDD.view(dom, model).bind();
      model.types.each(function(t) {
        expect(dom.find('.food-type option').text()).to(include, t);
      });
    });

    it('removes existing values when populating types', function() {
      var model = { types: ['Cheese'], foods: function() { return []; } };
      TDD.view(dom, model).bind();
      expect(dom.find('.food-type option').text()).not_to(include, 'Meat');
    });

    it('raises onTypeSelected when a type changes', function() {
      var view = TDD.view(dom, { types: [] }).bind();
      expect(view).to(receive, 'onTypeSelected');
      dom.find('.food-type').change();
    });

    it('passes the new selection to onTypeSelected', function() {
      var view = TDD.view(dom, { types: ['Meat'] }).bind();
      expect(view).to(receive, 'onTypeSelected').with_args('Meat');
      dom.find('.food-type option').attr('selected', 'selected');
      dom.find('.food-type').change();
    });

    it('populates the food options when the model changes', function() {
      var model = {
        types: [],
        foods: function() { return ['Pancetta', 'Bayonne ham', 'Speck']; }
      };
      TDD.view(dom, model).modelChanged();
      model.foods().each(function(f) {
        expect(dom.find('.food option').text()).to(include, f);
      });
    });

    it('removes existing values when populating food options', function() {
      var model = { types: [], foods: function () { return []; } };
      TDD.view(dom, model).modelChanged();
      expect(dom.find('.food option').text())
        .not_to(include, 'Pate de Campagne');
    });
  });

  describe('model', function() {
    var model;
    before_each(function() {
      model = TDD.model({'Cheese': ['Epoisse', 'Comte'], 'Meat': []});
    });

    it('adds an empty type to the start of the list', function() {
      expect(model.types[0]).to(eql, '');
    });

    it('knows all the types', function() {
      expect(model.types.slice(1)).to(eql, ['Cheese', 'Meat']);
    });

    it('returns foods of the currently selected type', function() {
      model.select('Cheese');
      expect(model.foods()).to(eql, ['Epoisse', 'Comte']);
    });

    it('returns no food for the empty type', function() {
      model.select('');
      expect(model.foods()).to(eql, []);
    });

    it('selects the empty type by default', function() {
      expect(model.foods()).to(eql, []);
    });

    it('triggers onChange when the type changes', function() {
      expect(model).to(receive, 'onChange');
      model.select('Cheese');
    });

    it("doesn't trigger onChange if the type didn't change", function(){
      model.select('Cheese');
      expect(model).not_to(receive, 'onChange');
      model.select('Cheese');
    });
  });

  describe('controller', function () {
    it('wires up view.onTypeSelected to model.select', function() {
      var model = { select: function() {} };
      var view = {};
      TDD.controller(model, view);
      expect(model).to(receive, 'select').with_args('Fish');
      view.onTypeSelected('Fish');
    });

    it('wires up model.onChange to view.modelChanged', function() {
      var model = {};
      var view = { modelChanged: function() {} };
      TDD.controller(model, view);
      expect(view).to(receive, 'modelChanged');
      model.onChange();
    });
  });
});
