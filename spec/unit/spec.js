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
  });
});
