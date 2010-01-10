describe('tdd.js', function() {
  describe('view', function() {
    it('should raise onTypeSelected when a type is selected', function() {
      var dom = jQuery('<select class="food-type">'
                       + '<option>Meat</option></select>');
      view(dom).should.receive('onTypeSelected');
      dom.find('option').attr('selected', 'selected');
    });
  });
});
