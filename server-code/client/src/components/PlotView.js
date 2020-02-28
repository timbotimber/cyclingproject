import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import MapBoxGLDraw from 'mapbox-gl-draw';

mapboxgl.accessToken =
  'pk.eyJ1IjoiamFjcXVlbGluZWNoZW4iLCJhIjoiY2s2ZHB5Y2RxMDkxbzNkbXA2bXVzM3JvbiJ9.pUyDxtMWjGqmGgX4JAdL7g';

export default class PlotView extends React.Component {
  // constructor(props) {
  //   super(props);
  state = {
    map: null,
    draw: null,
    lng: 5,
    lat: 34,
    zoom: 4,
    duration: '',
    distance: '',
  };

  //
  removeRoute = () => {
    if (this.state.map.getSource('route')) {
      this.state.map.removeLayer('route');
      this.state.map.removeSource('route');
      //  document.getElementById('calculated-line').innerHTML = '';
    } else {
      return;
    }
  };

  updateRoute = () => {
    this.removeRoute(); // overwrite any existing layers
    let data = this.state.draw.getAll();
    let answer = document.getElementById('calculated-line');
    let lastFeature = data.features.length - 1;
    let coords = data.features[lastFeature].geometry.coordinates;
    let newCoords = coords.join(';');
    this.getMatch(newCoords);
  };

  getMatch = e => {
    let url =
      'https://api.mapbox.com/directions/v5/mapbox/cycling/' +
      e +
      '?geometries=geojson&steps=true&&access_token=' +
      mapboxgl.accessToken;

    let req = new XMLHttpRequest();
    console.log('req', req);
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload = () => {
      let jsonResponse = req.response;
      console.log('jsonReponse', jsonResponse);
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
    if (this.state.map.getSource('route')) {
      this.state.map.removeLayer('route');
      this.state.map.removeSource('route');
    } else {
      this.state.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: coords,
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3b9ddd',
          'line-width': 8,
          'line-opacity': 0.8,
        },
      });
    }
  };

  getInstructions = data => {
    // Target the sidebar to add the instructions
    let directions = document.getElementById('directions');
    let legs = data.legs;
    let tripDirections = [];
    // Output the instructions for each step of each leg in the response object
    for (let i = 0; i < legs.length; i++) {
      let steps = legs[i].steps;
      for (let j = 0; j < steps.length; j++) {
        tripDirections.push('<br><li>' + steps[j].maneuver.instruction + '</li>');
      }
    }
    // directions.innerHTML = '<br><h2>Trip duration: ' + Math.floor(data.duration / 60) + ' min.</h2>' + tripDirections;
  };

  componentDidMount = () => {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      duration: this.state.duration,
      distance: this.state.distance,
    });
    // console.log('duration', duration);
    const draw = new MapBoxGLDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true,
      },
      styles: [
        // ACTIVE (being drawn)
        // line stroke
        {
          id: 'gl-draw-line',
          type: 'line',
          filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#3b9ddd',
            'line-dasharray': [0.2, 2],
            'line-width': 4,
            'line-opacity': 0.7,
          },
        },
        // vertex point halos
        {
          id: 'gl-draw-polygon-and-line-vertex-halo-active',
          type: 'circle',
          filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
          paint: {
            'circle-radius': 10,
            'circle-color': '#FFF',
          },
        },
        // vertex points
        {
          id: 'gl-draw-polygon-and-line-vertex-active',
          type: 'circle',
          filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
          paint: {
            'circle-radius': 6,
            'circle-color': '#3b9ddd',
          },
        },
      ],
    });

    this.setState({ map, draw }, () => {
      const { map, draw } = this.state;

      // add the draw tool to the map
      map.addControl(draw);

      // add create, update, or delete actions
      map.on('draw.create', this.updateRoute);
      map.on('draw.update', this.updateRoute);
      map.on('draw.delete', this.removeRoute);

      // Storing new coordinate (whatever the user interacts with)
      map.on('move', () => {
        this.setState({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2),
        });
      });
    });
  };

  render() {
    console.log(this.state.map);
    return (
      <div>
        <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}
          </div>
        </div>
        <div ref={el => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('app'));
