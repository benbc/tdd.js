describe('tdd.js', function() {
  describe('view', function() {
    it('should raise onTypeSelected when a type changes', function() {
      var dom = jQuery('<form><select class="food-type"></select></form');
      view(dom).should.receive('onTypeSelected');
      dom.find('.food-type').change();
    });

    it('should pass the new selection to onTypeSelected', function() {
      var dom = jQuery('<form><select class="food-type">'
                     + '  <option selected="selected">Meat</option>'
                     + '</select></form');
      view(dom).should.receive('onTypeSelected').with_args('Meat');
      dom.find('.food-type').change();
    });

    it('should populate the food options', function() {
      var dom = jQuery('<form><select class="foodstuff"></select></form>');
      var model = { foods: ['Pancetta', 'Bayonne ham',
                            'Speck', 'Prosciutto'] };
      var v = view(dom, model);
      v.modelChanged();
      model.foods.each(function(f) {
        dom.should.have_child('.food option:contains('+f+')');
        dom.find('.food option').text().should.include(f);
      });
    });
  });
});
