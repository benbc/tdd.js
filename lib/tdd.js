function view(dom) {
  dom.find('.food-type').css('color', 'green');
}

function init() {
  view(jQuery('form'));
}
