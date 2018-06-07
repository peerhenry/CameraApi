function showOnMap(map, camData){
  camData.forEach(cam => camToMarker(map, cam));
}

function camToMarker(map, cam){
  const coord = { lat: cam.latitude, lng: cam.longitude };
  return new google.maps.Marker({
    position: coord,
    map: map,
    title: cam.name
  });
}

export default showOnMap;