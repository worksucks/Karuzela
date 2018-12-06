var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'center',
  contain: true,
  pageDots: false,
  hash: true
});

// element argument can be a selector string
//   for an individual element
var flkty = new Flickity( '.main-carousel', {
  // options
  pageDots: false,
});
