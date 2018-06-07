import showInTable from './showInTable';
import showOnMap from './showOnMap';

function handleData(map, camData){
  showInTable(camData);
  showOnMap(map, camData);
  camData.forEach(cam => {
    if(cam.error) console.log("Warning, invalid data detected: " + cam.error);
  });
}

export default handleData;