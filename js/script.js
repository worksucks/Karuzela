var template_img_list = document.getElementById("slide-item").innerHTML;
var mainCarousel = document.querySelector(".main-carousel");


Mustache.parse(template_img_list);
var data = '';
for (let i=0; i< slaid_object.length; i++){
    data += Mustache.render(template_img_list,slaid_object[i]);
}

mainCarousel.innerHTML = data;
console.log(mainCarousel, data);

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'center',
  contain: true,
  pageDots: true,
  hash: true
});


//var flkty = new Flickity( '.main-carousel');

var button = document.getElementById("firstSlide");
button.addEventListener('click', function(){
  flkty.select([0]);
});

var progressBar = document.querySelector('.progress-bar')
flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});
