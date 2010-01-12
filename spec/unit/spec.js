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
      view(dom).should.receive('onTypeSelected');
      dom.find('.food-type').change();
    });

    it('passes the new selection to onTypeSelected', function() {
      view(dom).should.receive('onTypeSelected').with_args('Meat');
      dom.find('.food-type').change();
    });

    it('populates the food options when the model changes', function() {
      var model = {
        foods: function() { return ['Pancetta', 'Bayonne ham', 'Speck']; }
      };
      view(dom, model).modelChanged();
      model.foods().each(function(f) {
        dom.find('.food option').text().should.include(f);
      });
    });

    it('removes existing values when populating food options', function() {
      var model = { foods: function () { return []; } };
      view(dom, model).modelChanged();
      dom.find('.food option').text().should_not.include('Pate de Campagne');
    });
  });

  describe('model', function() {
    var m;
    before(function() {
      m = model({'Cheese': ['Epoisse', 'Comte']});
    });

    it('returns no foods by default', function() {
      m.foods().should.eql([]);
    });

    it('returns foods of the currently selected type', function() {
      m.select('Cheese');
      m.foods().should.eql(['Epoisse', 'Comte']);
    });

    it('clears the foods if an empty type is passed', function() {
      m.select('Cheese');
      m.select('');
      m.foods().should.eql([]);
    });

    it('triggers onModelChanged when the type changes', function() {
      m.should.receive('onModelChanged');
      m.select('Cheese');
    });

    it("doesn't trigger onModelChanged if the type didn't change", function(){
      m.select('Cheese');
      m.should_not.receive('onModelChanged');
      m.select('Cheese');
    });
  });

  describe('controller', function () {
    it('wires up onTypeSelected to model.select', function() {
      var model = { select: function() {} };
      var view = {};
      controller(model, view);
      model.should.receive('select').with_args('Fish');
      view.onTypeSelected('Fish');
    });
  });
});
