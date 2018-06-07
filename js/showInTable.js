import domTableInsert from './domTableInsert'

function showInTable(camData){
  camData.forEach(cam => {
    domTableInsert(cam);
  });
}

export default showInTable;