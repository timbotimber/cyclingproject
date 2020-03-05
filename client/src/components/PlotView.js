import React from "react";
import mapboxgl from "mapbox-gl";
import MapBoxGLDraw from "mapbox-gl-draw";
import axios from "axios";
import { Link } from "react-router-dom";
import TripReview from "./TripReview";
mapboxgl.accessToken =
  "pk.eyJ1IjoiamFjcXVlbGluZWNoZW4iLCJhIjoiY2s2ZHB5Y2RxMDkxbzNkbXA2bXVzM3JvbiJ9.pUyDxtMWjGqmGgX4JAdL7g";

let map;

export default class PlotView extends React.Component {
  state = {
    title: "",
    origin: [],
    origin_name: "",
    destination: [],
    destination_name: "",
    map: null,
    draw: null,
    lng: 5,
    lat: 34,
    zoom: 4,
    uuid: "",
    duration: "",
    distance: "",
    difficulty: "",
    elevations: [],
    elevation_gain: 0,
    coordinates: [],
    waypoints: [],
    reviewTrip: false,
    user: ""
  };

  // REMOVE ROUTE
  removeRoute = () => {
    if (this.state.map.getSource("route")) {
      this.state.map.removeLayer("route");
      this.state.map.removeSource("route");
      //  document.getElementById('calculated-line').innerHTML = '';
    } else {
      return;
    }
  };

  // UPDATE ROUTE
  updateRoute = () => {
    this.removeRoute(); // overwrite any existing layers
    let data = this.state.draw.getAll();
    let answer = document.getElementById("calculated-line");
    let lastFeature = data.features.length - 1;
    let coords = data.features[lastFeature].geometry.coordinates;
    let newCoords = coords.join(";");
    this.getMatch(newCoords);
  };

  // RENDERING MATCHED ROUTE
  getMatch = e => {
    let url =
      "https://api.mapbox.com/directions/v5/mapbox/cycling/" +
      e +
      "?geometries=geojson&steps=true&&access_token=" +
      mapboxgl.accessToken;
    let req = new XMLHttpRequest();
    // console.log("req", req);
    req.responseType = "json";
    req.open("GET", url, true);
    req.onload = () => {
      let jsonResponse = req.response;
      let arr = jsonResponse.routes[0].geometry.coordinates;
      // console.log("jsonReponse", jsonResponse);
      // CALCULATING DIFFICULTY LEVEL BASED ON DISTANCE
      let distance = jsonResponse.routes[0].distance * 0.001;
      let difficulty = "";
      if (distance < 50) {
        difficulty = "Easy";
      } else if (distance >= 150) {
        difficulty = "Advanced";
      } else {
        difficulty = "Intermediate";
      }
      this.setState(
        {
          distance: distance,
          duration: jsonResponse.routes[0].duration / 60,
          coordinates: jsonResponse.routes[0].geometry.coordinates,
          uuid: jsonResponse.uuid,
          waypoints: jsonResponse.waypoints,
          origin: jsonResponse.routes[0].geometry.coordinates[0],
          destination:
            jsonResponse.routes[0].geometry.coordinates[arr.length - 1],
          difficulty: difficulty
        },
        () => {
          console.log(this.state);
          this.snapToBounds();
          this.reverseGeocode();
          this.getElevations().then(response => {
            console.log("response", response);

            this.calculateGain(response);
          });
          // console.log(this.getElevations());
          // console.log("coordinates", this.state.coordinates);
        }
      );

      let coords = jsonResponse.routes[0].geometry;
      // add the route to the map
      this.addRoute(coords);
      this.getInstructions(jsonResponse.routes[0]);
    };
    req.send();
  };

  // RETRIEVE ELEVATION DATA
  getElevations = async () => {
    let elevations = [];

    let promises = this.state.coordinates.map(coord => {
      return axios
        .get(
          `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${coord[0]},${coord[1]}.json?layers=contour&limit=50&access_token=${mapboxgl.accessToken}`
        )
        .then(response => {
          response = response.data.features;
          for (const feature of response) {
            elevations.push(feature.properties.ele);
          }
        });
    });
    console.log("elevations", elevations);
    await Promise.all(promises);
    this.setState({
      elevations: elevations
    });
    return elevations;
  };

  // CALCULATING ELEVATION GAIN
  calculateGain = arr => {
    console.log(arr);
    let gain = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[i - 1]) {
        gain += arr[i] - arr[i - 1];
      }
    }
    console.log("gain", gain);
    let realisticGain = gain / 2;
    this.setState({
      elevation_gain: realisticGain
    });
  };

  // ADD ROUTE
  addRoute = coords => {
    // check if the route is already loaded
    if (this.state.map.getSource("route")) {
      this.state.map.removeLayer("route");
      this.state.map.removeSource("route");
    } else {
      this.state.map.addLayer({
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
          "line-color": "#ff6962",
          "line-width": 8,
          "line-opacity": 0.8
        }
      });
    }
  };

  // GET NAVIGATION INSTRUCTIONS
  getInstructions = data => {
    // Target the sidebar to add the instructions
    let directions = document.getElementById("directions");
    let legs = data.legs;
    let tripDirections = [];
    // Output the instructions for each step of each leg in the response object
    for (let i = 0; i < legs.length; i++) {
      let steps = legs[i].steps;
      for (let j = 0; j < steps.length; j++) {
        tripDirections.push(
          "<br><li>" + steps[j].maneuver.instruction + "</li>"
        );
      }
    }
    // directions.innerHTML = '<br><h2>Trip duration: ' + Math.floor(data.duration / 60) + ' min.</h2>' + tripDirections;
  };

  // COMPONENT DID MOUNT
  componentDidMount = () => {
    const id = this.props.match.params.id;
    axios.get(`/api/trips/trip/${id}`).then(response => {
      console.log("response", response);
      this.setState({
        trip: response.data
      });
    });
    map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: "mapbox://styles/mapbox/streets-v11",
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      duration: this.state.duration,
      distance: this.state.distance
    });
    // console.log('duration', duration);
    const draw = new MapBoxGLDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true
      },
      styles: [
        // ACTIVE (being drawn)
        // line stroke
        {
          id: "gl-draw-line",
          type: "line",
          filter: [
            "all",
            ["==", "$type", "LineString"],
            ["!=", "mode", "static"]
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round"
          },
          paint: {
            "line-color": "#ff6962", // Color: "sky"
            "line-dasharray": [0.2, 2],
            "line-width": 4,
            "line-opacity": 1.0
          }
        },
        // vertex point halos
        {
          id: "gl-draw-polygon-and-line-vertex-halo-active",
          type: "circle",
          filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"]
          ],
          paint: {
            "circle-radius": 10,
            "circle-color": "#FFF"
          }
        },
        // vertex points
        {
          id: "gl-draw-polygon-and-line-vertex-active",
          type: "circle",
          filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"]
          ],
          paint: {
            "circle-radius": 6,
            "circle-color": "#ff6962"
          }
        }
      ]
    });
    this.setState({ map, draw }, () => {
      const { map, draw } = this.state;
      // add the draw tool to the map
      map.addControl(draw);
      // add create, update, or delete actions
      map.on("draw.create", this.updateRoute);
      map.on("draw.update", this.updateRoute);
      map.on("draw.delete", this.removeRoute);
      // Storing new coordinate (whatever the user interacts with)
      map.on("move", () => {
        this.setState({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });
      });
    });
  };

  // REVERSE GEOCODING: GETTING LOCATION NAME FROM COORDINATES
  reverseGeocode = () => {
    // Origin
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.origin[0]},${this.state.origin[1]}.json?access_token=${mapboxgl.accessToken}`
      )
      .then(response => {
        // console.log("full", response);
        let features = response.data.features;
        // console.log(features);
        const locality = features.find(el =>
          el.place_type.includes("locality")
        );
        if (locality) {
          this.setState({ origin_name: locality.place_name });
          return;
        }
        const place = features.find(el => el.place_type.includes("place"));
        if (place) {
          this.setState({ origin_name: place.place_name });
          return;
        }
        const region = features.find(el => el.place_type.includes("region"));
        if (region) {
          this.setState({ origin_name: region.place_name });
          return;
        }
      });
    // Destination
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.destination[0]},${this.state.destination[1]}.json?access_token=${mapboxgl.accessToken}`
      )
      .then(response => {
        let features = response.data.features;
        const locality = features.find(el =>
          el.place_type.includes("locality")
        );
        if (locality) {
          this.setState({ destination_name: locality.place_name });
          return;
        }
        const place = features.find(el => el.place_type.includes("place"));
        if (place) {
          this.setState({ destination_name: place.place_name });
          return;
        }
        const region = features.find(el => el.place_type.includes("region"));
        if (region) {
          this.setState({ destination_name: region.place_name });
          return;
        }
      });
  };

  // TOGGLE MAP SIDEBAR VIEW
  goToReviewTrip = () => {
    this.setState({
      reviewTrip: !this.state.reviewTrip
    });
  };

  // UPDATE TITLE OF TRIP
  updateTitle = text => {
    this.setState({
      title: text
    });
  };

  // ROUTE: ZOOM TO FIT
  snapToBounds = () => {
    let coordinates = this.state.coordinates;
    let bounds = coordinates.reduce((bounds, coord) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    map.fitBounds(bounds, {
      padding: 100
    });
  };

  render() {
    // console.log(this.state);
    let tripReviewCard;
    let text;
    if (this.state.reviewTrip) {
      text = "Go Back";
      tripReviewCard = (
        <div className="sidebarReview">
          <TripReview tripData={this.state} updateTitle={this.updateTitle} />
        </div>
      );
    } else {
      text = "Check out your Details!";
    }
    return (
      <div>
        {this.state.distance && (
          <div className="sidebar">
            {tripReviewCard}
            <button className="button-solid" onClick={this.goToReviewTrip}>
              {text}
            </button>
          </div>
        )}
        {!this.state.distance && (
          <div className="popUp">
            <p className="caption-strong">
              Plot out your trip and press enter{" "}
            </p>
          </div>
        )}
        <div ref={el => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}
// ReactDOM.render(<App />, document.getElementById('app'));
