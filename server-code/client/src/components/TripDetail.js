import React, { Component } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapBoxGLDraw from "mapbox-gl-draw";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamFjcXVlbGluZWNoZW4iLCJhIjoiY2s2ZHB5Y2RxMDkxbzNkbXA2bXVzM3JvbiJ9.pUyDxtMWjGqmGgX4JAdL7g";

 Note: If waypoints name isn't empty string, can show it?

export default class TripDetail extends Component {
  state = {
    trip: null
     title: '',
     origin: [],
     destination: [],
     map: null,
     draw: null,
     lng: 5,
     lat: 34,
     zoom: 4,
     uuid: '',
     duration: '',
     distance: '',
     coordinates: [],
     waypoints: [],
     reviewTrip: false,
  };

  componentDidMount() {
    const id = this.props.match.params.id;

     console.log('this.props', this.props);

    axios.get(`/api/trips/trip/${id}`).then(response => {
      console.log("response", response);
      this.setState({
        trip: response.data
      });
    });
  }

  
   removeRoute = () => {
     if (this.state.map.getSource('route')) {
       this.state.map.removeLayer('route');
       this.state.map.removeSource('route');
         document.getElementById('calculated-line').innerHTML = '';
     } else {
       return;
     }
   };

   updateRoute = () => {
     this.removeRoute();  overwrite any existing layers
     let data = this.state.draw.getAll();
     let answer = document.getElementById('calculated-line');
     let lastFeature = data.features.length - 1;
     let coords = data.features[lastFeature].geometry.coordinates;
     let newCoords = coords.join(';');
     this.getMatch(newCoords);
   };

   getMatch = e => {
     let url =
       'https:api.mapbox.com/directions/v5/mapbox/cycling/' +
       e +
       '?geometries=geojson&steps=true&&access_token=' +
       mapboxgl.accessToken;

     let req = new XMLHttpRequest();
     console.log('req', req);
     req.responseType = 'json';
     req.open('GET', url, true);
     req.onload = () => {
       let jsonResponse = req.response;
       let arr = jsonResponse.routes[0].geometry.coordinates;
       console.log('jsonReponse', jsonResponse);
       this.setState(
         {
           distance: jsonResponse.routes[0].distance * 0.001,
           duration: jsonResponse.routes[0].duration / 60,
           coordinates: jsonResponse.routes[0].geometry.coordinates,
           uuid: jsonResponse.uuid,
           waypoints: jsonResponse.waypoints,
           origin: jsonResponse.routes[0].geometry.coordinates[0],
           destination: jsonResponse.routes[0].geometry.coordinates[arr.length - 1],
         },
         () => console.log(this.state)
       );
        let distance = jsonResponse.routes[0].distance * 0.001;
        let duration = jsonResponse.routes[0].duration / 60;
       console.log(jsonResponse);

        document.getElementById('calculated-line').innerHTML =
        'Distance: ' + distance.toFixed(2) + ' km<br>Duration: ' + duration.toFixed(2) + ' minutes';
       let coords = jsonResponse.routes[0].geometry;
        add the route to the map
       this.addRoute(coords);
       this.getInstructions(jsonResponse.routes[0]);
     };
     req.send();
   };

   addRoute = coords => {
      check if the route is already loaded
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
      Target the sidebar to add the instructions
     let directions = document.getElementById('directions');
     let legs = data.legs;
     let tripDirections = [];
      Output the instructions for each step of each leg in the response object
     for (let i = 0; i < legs.length; i++) {
       let steps = legs[i].steps;
       for (let j = 0; j < steps.length; j++) {
         tripDirections.push('<br><li>' + steps[j].maneuver.instruction + '</li>');
       }
     }
      directions.innerHTML = '<br><h2>Trip duration: ' + Math.floor(data.duration / 60) + ' min.</h2>' + tripDirections;
   };

   componentDidMount = () => {
     const map = new mapboxgl.Map({
  container: this.mapContainer,
       style: 'mapbox:styles/mapbox/streets-v11',
       center: [this.state.lng, this.state.lat],
       zoom: this.state.zoom,
       duration: this.state.duration,
       distance: this.state.distance,
     });
      console.log('duration', duration);
     const draw = new MapBoxGLDraw({
       displayControlsDefault: false,
       controls: {
         line_string: true,
         trash: true,
       },
       styles: [
          ACTIVE (being drawn)
          line stroke
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
          vertex point halos
         {
           id: 'gl-draw-polygon-and-line-vertex-halo-active',
           type: 'circle',
           filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
           paint: {
             'circle-radius': 10,
             'circle-color': '#FFF',
           },
         },
          vertex points
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

      console.log('this.props', this.props);

     this.setState({ map, draw }, () => {
       const { map, draw } = this.state;
       const id = this.props.match.params.id;
        add the draw tool to the map

       axios.get(`/api/trips/trip/${id}`).then(response => {
         console.log('response', response);
         this.setState({
           trip: response.data,
         });
       });

       map.addControl(draw);

        add create, update, or delete actions
       map.on('draw.create', this.updateRoute);
       map.on('draw.update', this.updateRoute);
       map.on('draw.delete', this.removeRoute);

        Storing new coordinate (whatever the user interacts with)
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
    {
      const trip = this.state.trip;

      if (!trip) {
        return <div>No Trips Match Your Search</div>;
      }
      return (
        <>
          <h1>{trip.title}</h1>
          <p>{trip.duration}</p>
          <p>{trip.distance}</p>
          {/* <div ref={el => (this.mapContainer = el)} className="mapContainer" /> */}

          {/* <div id="timeline-content">
          <h1>Timeline</h1>

          <ul class="timeline">
            <li class="event" data-date="">
              <h3>Amsterdam to Rotterdam</h3>
              <p>RAWWWWWWRRR 🐢🦂</p>
            </li>
            <li class="event" data-date="">
              <h3>Rotterdam to Nancy</h3>
              <p>"We can be all things to all people!" 📣</p>
            </li>
            <li class="event" id="date" data-date="">
              <h3>Nancy to Paris</h3>
              <p></p> <p>"We can be all things to Squarespace users!" 📣</p>
            </li>
          </ul>
        </div> */}
        </>
      );
    }
  }
}

 export default class PostDetail extends Component {
   state = {
     post: null
   };

   componentDidMount() {
     const id = this.props.match.params.postId;

     axios.get(`/api/posts/${id}`).then(response => {
       this.setState({
         post: response.data
       });
     });
   }

   handleUpvote = () => {
     const id = this.props.match.params.postId;

     axios.post(`/api/posts/${id}/upvote`).then(response => {
       this.setState({ post: response.data });
     });
   };

   render() {
     const post = this.state.post;

     if (!post) {
       return <div>Loading</div>;
     }
     return (
       <div>
         <h2>
           [{post.type}] {post.title}
         </h2>
         {post.type === "link" ? (
           <a href={post.content}>{post.content}</a>
         ) : (
           <p>{post.content}</p>
         )}
         <p>posted on {new Date(post.created_at).toDateString()}</p>
         <p>Upvoted {post.upvote_count} times</p>
         {this.props.isLoggedIn ? (
           <button onClick={this.handleUpvote}>upvote</button>
         ) : (
           <Link to="/login">Login to upvote this post</Link>
         )}
       </div>
     );
   }
