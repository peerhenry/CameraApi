function domTableInsert(cam){
  let column = "columnOther";
  if(cam.index % 3 == 0 && cam.index % 5 == 0) column = "column15";
  else if(cam.index % 3 == 0) column = "column3";
  else if(cam.index % 5 == 0) column = "column5";
  insertInTable(column, cam);
}

function insertInTable(id, cam){
  const table = document.getElementById(id);
  const tbody = table.childNodes[1];
  var row = document.createElement("tr");
  appendProp(row, cam.index);
  appendProp(row, cam.name);
  appendProp(row, cam.longitude);
  appendProp(row, cam.latitude);
  tbody.appendChild(row);
}

function appendProp(row, prop){
  const td = document.createElement("td");
  td.innerHTML = prop;
  row.appendChild(td);
}

export default domTableInsert;