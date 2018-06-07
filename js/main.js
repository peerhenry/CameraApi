import initMap from './initMap'
import apiKey from './apiKey'

window.initMap = initMap;

(function(d, script) {
  script = d.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.onload = function(){
      // remote script has loaded
  };
  script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey +  "&libraries=places&callback=initMap";
  d.getElementsByTagName('head')[0].appendChild(script);
}(document));