const assert = require("assert");
import domTableInsert from './domTableInsert'

let calledId = "";
function arrange(){
  const table = document.createElement("table");
  table.appendChild(document.createElement("th"));
  let tbody = document.createElement("tbody")
  table.appendChild(tbody);
  document.getElementById = function(id){
    calledId = id;
    return table;
  }
  return tbody;
}

describe("domTableInsert", () => {
  it("should append camera entry to tbody", () => {
    // arrange
    let tbody = arrange();
    // act
    domTableInsert({index: 15, longitude: 1, latitude: 2, name: 'Pietje'})
    // assert
    assert.equal(tbody.children.length, 1);
    assert.equal("column15", calledId);
  })

  it("should use id column3 for multiples of 3", () => {
    // arrange
    arrange();
    // act
    domTableInsert({index: 6, longitude: 1, latitude: 2, name: 'Pietje'})
    // assert
    assert.equal("column3", calledId);
  })

  it("should use id column5 for multiples of 5", () => {
    // arrange
    arrange();
    // act
    domTableInsert({index: 10, longitude: 1, latitude: 2, name: 'Pietje'})
    // assert
    assert.equal("column5", calledId);
  })

  it("should use id column15 for multiples of both 3 and 5", () => {
    // arrange
    arrange();
    // act
    domTableInsert({index: 15, longitude: 1, latitude: 2, name: 'Pietje'})
    // assert
    assert.equal("column15", calledId);
  })

  it("should use id columnOther for the rest", () => {
    // arrange
    arrange();
    // act
    domTableInsert({index: 1, longitude: 1, latitude: 2, name: 'Pietje'})
    // assert
    assert.equal("columnOther", calledId);
    // act
    domTableInsert({index: 2, longitude: 1, latitude: 2, name: 'Pietje'})
    // assert
    assert.equal("columnOther", calledId);
    // act
    domTableInsert({index: 4, longitude: 1, latitude: 2, name: 'Pietje'})
    // assert
    assert.equal("columnOther", calledId);
  })
})