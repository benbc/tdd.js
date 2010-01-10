describe('view', function() {
  it('should color the dropdown green', function() {
    var dom = jQuery('<form><select class="food-type"></select></form>');
    view(dom);
    dom.find('.food-type').css('color').should.be('green');
  });
});
