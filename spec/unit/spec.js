describe('tdd.js', function() {
  describe('view', function() {
    var dom;
    before(function() {
      dom = jQuery('<form>'
                 + '  <select class="food-type">'
                 + '    <option selected="selected">Meat</option>'
                 + '  </select>'
                 + '  <select class="food">'
                 + '    <option>Pate de Campagne</option>'
                 + '  </select>'
                 + '</form>');
    });

    it('raises onTypeSelected when a type changes', function() {
      TDD.view(dom).should.receive('onTypeSelected');
      dom.find('.food-type').change();
    });

    it('passes the new selection to onTypeSelected', function() {
      TDD.view(dom).should.receive('onTypeSelected').with_args('Meat');
      dom.find('.food-type').change();
    });

    it('populates the food options when the model changes', function() {
      var model = {
        foods: function() { return ['Pancetta', 'Bayonne ham', 'Speck']; }
      };
      TDD.view(dom, model).modelChanged();
      model.foods().each(function(f) {
        dom.find('.food option').text().should.include(f);
      });
    });

    it('removes existing values when populating food options', function() {
      var model = { foods: function () { return []; } };
      TDD.view(dom, model).modelChanged();
      dom.find('.food option').text().should_not.include('Pate de Campagne');
    });

    it('populates the types when created', function() {
      fail('not yet implemented');
    });
  });

  describe('model', function() {
    var model;
    before(function() {
      model = TDD.model({'Cheese': ['Epoisse', 'Comte']});
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
