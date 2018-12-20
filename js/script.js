
window.initMap = function () {
  var kociarnia = {lat: 50.0645, lng: 19.9453};
  var map = new google.maps.Map(
  document.getElementById('map'), {zoom: 6, center: slaid_object[0].coords });
  for (let i=0; i< slaid_object.length; i++){
    var marker = new google.maps.Marker({position: slaid_object[i].coords, map: map});
    marker.addListener('click', function(){
      flkty.select([i]);
    })
  }

  var template_img_list = document.getElementById("slide-item").innerHTML;
  var mainCarousel = document.querySelector(".main-carousel");

  Mustache.parse(template_img_list);
  var data = '';
  for (let i=0; i< slaid_object.length; i++){
      data += Mustache.render(template_img_list,slaid_object[i]);
  }

  mainCarousel.innerHTML = data;

  var elem = document.querySelector('.main-carousel');
  var flkty = new Flickity( elem, {
    // options
    cellAlign: 'center',
    contain: true,
    pageDots: true,
    hash: true
  });

  flkty.on('change', function (index) {
    smoothPanAndZoom(map, 10, slaid_object[index].coords);
  });

  var button = document.getElementById("firstSlide");
  button.addEventListener('click', function(){
    flkty.select([0]);
  });

  var progressBar = document.querySelector('.progress-bar')
  flkty.on( 'scroll', function( progress ) {
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
  });

}

//FUNKCJE

var smoothPanAndZoom = function (map, zoom, coords) {
    //onsole.log(map);
    var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
    jumpZoom = Math.min(jumpZoom, zoom - 1);
    jumpZoom = Math.max(jumpZoom, 3);
    smoothZoom(map, jumpZoom, function () {
        smoothPan(map, coords, function () {
            smoothZoom(map, zoom);
        });
    });
};
var smoothZoom = function (map, zoom, callback) {
    var startingZoom = map.getZoom();
    var steps = Math.abs(startingZoom - zoom);

    if (!steps) {
        if (callback) {
            callback();
        }
        return;
    }
    var stepChange = -(startingZoom - zoom) / steps;
    var i = 0;
    var timer = window.setInterval(function () {
        if (++i >= steps) {
            window.clearInterval(timer);
            if (callback) {
                callback();
            }
        }
        map.setZoom(Math.round(startingZoom + stepChange * i));
    }, 80);
};

var smoothPan = function (map, coords, callback) {
var mapCenter = map.getCenter();
coords = new google.maps.LatLng(coords);

var steps = 12;
var panStep = {
    lat: (coords.lat() - mapCenter.lat()) / steps,
    lng: (coords.lng() - mapCenter.lng()) / steps
};

var i = 0;
var timer = window.setInterval(function () {
    if (++i >= steps) {
        window.clearInterval(timer);
        if (callback) callback();
    }
    map.panTo({
        lat: mapCenter.lat() + panStep.lat * i,
        lng: mapCenter.lng() + panStep.lng * i
    });
}, 1000 / 30);
};
