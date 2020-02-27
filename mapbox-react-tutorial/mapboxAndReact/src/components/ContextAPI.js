import React from "react";
const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    removeRoute: () => {
      if (this.map.getSource("route")) {
        this.map.removeLayer("route");
        this.map.removeSource("route");
        document.getElementById("calculated-line").innerHTML = "";
      } else {
        return;
      }
    },

    updateRoute: () => {
      this.removeRoute(); // overwrite any existing layers
      let data = this.draw.getAll();
      let answer = document.getElementById("calculated-line");
      let lastFeature = data.features.length - 1;
      let coords = data.features[lastFeature].geometry.coordinates;
      let newCoords = coords.join(";");
      this.getMatch(newCoords);
    },

    getMatch: e => {
      let url =
        "https://api.mapbox.com/directions/v5/mapbox/cycling/" +
        e +
        "?geometries=geojson&steps=true&&access_token=" +
        mapboxgl.accessToken;

      let req = new XMLHttpRequest();
      console.log("req", req);
      req.responseType = "json";
      req.open("GET", url, true);
      req.onload = function() {
        let jsonResponse = req.response;
        console.log("jsonReponse", jsonResponse);
        let distance = jsonResponse.routes[0].distance * 0.001;
        let duration = jsonResponse.routes[0].duration / 60;
        document.getElementById("calculated-line").innerHTML =
          "Distance: " +
          distance.toFixed(2) +
          " km<br>Duration: " +
          duration.toFixed(2) +
          " minutes";
        let coords = jsonResponse.routes[0].geometry;
        // add the route to the map
        this.addRoute(coords);
        this.getInstructions(jsonResponse.routes[0]);
      };
      req.send();
    },
    addRoute: coords => {
      if (this.map.getSource("route")) {
        this.map.removeLayer("route");
        this.map.removeSource("route");
      } else {
        this.map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: coords
            }
          },
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#3b9ddd",
            "line-width": 8,
            "line-opacity": 0.8
          }
        });
      }
    }
  };

  render() {
    return (
      <MyContext.Provider value={{ state: this.state }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

// const ContextApi = () => {
//     return (
//         <div>
//         </div>
//     )
// }
// export default ContextApi
