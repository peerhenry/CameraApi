import axios from 'axios';
import handleCamData from './handleCamData';

function initMap() {
  var myLatLng = {lat: 52.1, lng: 5.12}; // Utrecht
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: myLatLng
  });
  fetchCamData(map);
}

function fetchCamData(map){
  const url = 'api/Camera';
  axios.get(url)
  .then(
    response => {
      console.log("handling response.data...");
      handleCamData(map, response.data);
    }
  )
  .catch(err => {
    console.log(err);
  })
}

export default initMap;