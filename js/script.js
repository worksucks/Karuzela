var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'center',
  contain: true,
  pageDots: true,
  hash: true,
});


//var flkty = new Flickity( '.main-carousel');
var button = document.getElementById("firstSlide");

var progressBar = document.querySelector('.progress-bar')
button.addEventListener('click', function(){
  flkty.select([0]);
});

flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});
