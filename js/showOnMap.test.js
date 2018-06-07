const assert = require("assert");
import showOnMap from './showOnMap'

console.log("running test");

describe("showOnMap", () => {
  it("should call google.maps.Marker constructor for each entry", () => {
    // arrange
    let counter = 0;
    window.google = {
      maps: {
        Marker: function(){
          counter++;
        }
      }
    }
    // act
    showOnMap(null, [1,2,3]);
    // assert
    assert.equal(3, counter);
  })

  it("should call google.maps.Marker with correct arguments", () => {
    // arrange
    let result = null;
    window.google = {
      maps: {
        Marker: function(thing){
          result = thing;
        }
      }
    }
    const dummyMap = "dummyMap";
    const dummyCamera = {
      name: "Jimmy",
      longitude: 21,
      latitude: 55
    }

    // act
    showOnMap(dummyMap, [dummyCamera]);
    // assert
    assert.equal(result.title, dummyCamera.name);
    assert.equal(result.map, dummyMap);
    assert.equal(result.position.lng, dummyCamera.longitude);
    assert.equal(result.position.lat, dummyCamera.latitude);
  })

})