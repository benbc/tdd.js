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
      TDD.view(dom, model);
      model.types.each(function(t) {
        expect(dom.find('.food-type option').text()).to(include, t);
      });
    });

    it('removes existing values when populating types', function() {
      var model = { types: ['Cheese'], foods: function() { return []; } };
      TDD.view(dom, model);
      expect(dom.find('.food-type option').text()).not_to(include, 'Meat');
    });

    it('raises onTypeSelected when a type changes', function() {
      TDD.view(dom, { types: [] }).should.receive('onTypeSelected');
      dom.find('.food-type').change();
    });

    it('passes the new selection to onTypeSelected', function() {
      var view = TDD.view(dom, { types: ['Meat'] });
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
        dom.find('.food option').text().should.include(f);
      });
    });

    it('removes existing values when populating food options', function() {
      var model = { types: [], foods: function () { return []; } };
      TDD.view(dom, model).modelChanged();
      dom.find('.food option').text().should_not.include('Pate de Campagne');
    });
  });

  describe('model', function() {
    var model;
    before_each(function() {
      model = TDD.model({'Cheese': ['Epoisse', 'Comte'], 'Meat': []});
    });

    it('knows all the types', function() {
      expect(model.types).to(eql, ['Cheese', 'Meat']);
    });

    it('returns no foods by default', function() {
      model.foods().should.eql([]);
    });

    it('returns foods of the currently selected type', function() {
      model.select('Cheese');
      model.foods().should.eql(['Epoisse', 'Comte']);
    });

    it('clears the foods if an empty type is passed', function() {
      model.select('Cheese');
      model.select('');
      model.foods().should.eql([]);
    });

    it('triggers onChange when the type changes', function() {
      model.should.receive('onChange');
      model.select('Cheese');
    });

    it("doesn't trigger onChange if the type didn't change", function(){
      model.select('Cheese');
      model.should_not.receive('onChange');
      model.select('Cheese');
    });
  });

  describe('controller', function () {
    it('wires up view.onTypeSelected to model.select', function() {
      var model = { select: function() {} };
      var view = {};
      TDD.controller(model, view);
      model.should.receive('select').with_args('Fish');
      view.onTypeSelected('Fish');
    });

    it('wires up model.onChange to view.modelChanged', function() {
      var model = {};
      var view = { modelChanged: function() {} };
      TDD.controller(model, view);
      view.should.receive('modelChanged');
      model.onChange();
    });
  });
});
