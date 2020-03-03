import React from "react";
import mapboxgl from "mapbox-gl";
import MapBoxGLDraw from "mapbox-gl-draw";
import axios from "axios";
import { Link } from "react-router-dom";
import TripReview from "./TripReview";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamFjcXVlbGluZWNoZW4iLCJhIjoiY2s2ZHB5Y2RxMDkxbzNkbXA2bXVzM3JvbiJ9.pUyDxtMWjGqmGgX4JAdL7g";

export default class TestMap extends React.Component {
  // constructor(props) {
  //   super(props);
  state = {
    title: "",
    origin: [],
    destination: [],
    map: null,
    draw: null,
    lng: 5,
    lat: 34,
    zoom: 4,
    uuid: "",
    duration: "",
    distance: "",
    coordinates: [],
    waypoints: [],
    reviewTrip: false
  };

  //
  removeRoute = () => {
    if (this.state.map.getSource("route")) {
      this.state.map.removeLayer("route");
      this.state.map.removeSource("route");
      //  document.getElementById('calculated-line').innerHTML = '';
    } else {
      return;
    }
  };

  updateRoute = () => {
    this.removeRoute(); // overwrite any existing layers
    let data = this.state.draw.getAll();
    let answer = document.getElementById("calculated-line");
    let lastFeature = data.features.length - 1;
    let coords = data.features[lastFeature].geometry.coordinates;
    let newCoords = coords.join(";");
    this.getMatch(newCoords);
  };

  getMatch = e => {
    let url =
      "https://api.mapbox.com/directions/v5/mapbox/cycling/" +
      e +
      "?geometries=geojson&steps=true&&access_token=" +
      mapboxgl.accessToken;

    let req = new XMLHttpRequest();
    console.log("req", req);
    req.responseType = "json";
    req.open("GET", url, true);
    req.onload = () => {
      let jsonResponse = req.response;
      let arr = jsonResponse.routes[0].geometry.coordinates;
      console.log("jsonReponse", jsonResponse);
      this.setState(
        {
          distance: jsonResponse.routes[0].distance * 0.001,
          duration: jsonResponse.routes[0].duration / 60,
          coordinates: jsonResponse.routes[0].geometry.coordinates,
          uuid: jsonResponse.uuid,
          waypoints: jsonResponse.waypoints,
          origin: jsonResponse.routes[0].geometry.coordinates[0],
          destination:
            jsonResponse.routes[0].geometry.coordinates[arr.length - 1]
        },
        () => console.log(this.state)
      );
      // let distance = jsonResponse.routes[0].distance * 0.001;
      // let duration = jsonResponse.routes[0].duration / 60;
      console.log(jsonResponse);

      // document.getElementById('calculated-line').innerHTML =
      // 'Distance: ' + distance.toFixed(2) + ' km<br>Duration: ' + duration.toFixed(2) + ' minutes';
      let coords = jsonResponse.routes[0].geometry;
      // add the route to the map
      this.addRoute(coords);
      this.getInstructions(jsonResponse.routes[0]);
    };
    req.send();
  };

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
          "line-color": "#3b9ddd",
          "line-width": 8,
          "line-opacity": 0.8
        }
      });
    }
  };

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

  componentDidMount = () => {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
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
            "line-color": "#3b9ddd",
            "line-dasharray": [0.2, 2],
            "line-width": 4,
            "line-opacity": 0.7
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
            "circle-color": "#3b9ddd"
          }
        }
      ]
    });

    /////////// change for line drawing ///////

    map.on("load", function() {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [-122.48369693756104, 37.83381888486939],
              [-122.48348236083984, 37.83317489144141],
              [-122.48339653015138, 37.83270036637107],
              [-122.48356819152832, 37.832056363179625],
              [-122.48404026031496, 37.83114119107971],
              [-122.48404026031496, 37.83049717427869],
              [-122.48348236083984, 37.829920943955045],
              [-122.48356819152832, 37.82954808664175],
              [-122.48507022857666, 37.82944639795659],
              [-122.48610019683838, 37.82880236636284],
              [-122.48695850372314, 37.82931081282506],
              [-122.48700141906738, 37.83080223556934],
              [-122.48751640319824, 37.83168351665737],
              [-122.48803138732912, 37.832158048267786],
              [-122.48888969421387, 37.83297152392784],
              [-122.48987674713133, 37.83263257682617],
              [-122.49043464660643, 37.832937629287755],
              [-122.49125003814696, 37.832429207817725],
              [-122.49163627624512, 37.832564787218985],
              [-122.49223709106445, 37.83337825839438],
              [-122.49378204345702, 37.83368330777276]
            ]
          }
        }
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#888",
          "line-width": 2
        }
      });
    });

    /////////// change for line drawing ///////

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
  // ///////////////////////////////  // ///////////////////////////////  // ///////////////////////////////

  PullCoords = () => {
    this.setState({
      reviewTrip: !this.state.reviewTrip
    });
  };

  // ///////////////////////////////  // ///////////////////////////////  // ///////////////////////////////

  updateTitle = text => {
    this.setState({
      title: text
    });
  };

  render() {
    // console.log(this.state);
    let tripReviewCard;
    let text;
    if (this.state.reviewTrip) {
      text = "Go Back";
      tripReviewCard = (
        <TripReview tripData={this.state} updateTitle={this.updateTitle} />
      );
    } else {
      text = "Review Trip";
    }

    return (
      <div>
        <div className="sidebarStyle">
          <div>
            <h1>Test map!!</h1>
          </div>
          {tripReviewCard}
          <button onClick={this.PullCoords}>Show data</button>
        </div>
        <div ref={el => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('app'));
