// import React from 'react';
// import axios from 'axios';
// import TripCard from './TripCard';

// class Profile extends React.Component {
//   // state = {
//   //   trips: [],
//   //   liked_trips: [],
//   //   button_state_trips: true,
//   //   button_style_trips: "sort-button-active",
//   //   button_state_favs: false,
//   //   button_style_favs: "sort-button"
//   // };

//   // componentDidMount() {
//   //   getData();
//   //   // tripsFilter();
//   // }

//   getData = () => {
//     // console.log("getData()");
//     axios.get('/api/trips/user').then(response => {
//       if (state.button_state_trips) {
//         setState({
//           trips: response.data,
//           button_style_trips: 'sort-button-active',
//           button_style_favs: 'sort-button',
//         });
//       }
//     });
//   };

//   showFavorites = () => {
//     axios.get(`/api/trips/trips/likedtrips`).then(response => {
//       if (!state.button_state_favs) {
//         setState({
//           trips: response.data,
//           button_style_favs: 'sort-button-active',
//           button_style_trips: 'sort-button',
//         });
//       }

//       console.log('Marcel is testing this shiz', state.liked_trips);
//     });
//   };

//   render() {
//     console.log('the arry', state.trips);
//     return (
//       <div className="wrapper">
//         <div className="profile-wrapper">
//           <div className="info-wrapper">
//             {/* <div>
//               <img className="profile-img" src={props.user.profilePic} alt="Profile Image" />
//             </div> */}

//             <div className="profile-img-wrapper">
//               {props.user.profilePic ? (
//                 <img className="profile-img" src={props.user.profilePic} alt="Profile" />
//               ) : (
//                 <img className="profile-img" src="./img/user_avatar.png" alt="Profile" />
//               )}
//             </div>

//             <h2>
//               {props.user.firstName} {props.user.lastName}
//             </h2>
//             <p>{props.user.email}</p>
//           </div>
//         </div>
//         <div className="trips-wrapper">
//           <div className="sort-button-wrapper">
//             <button className={state.button_style_trips} onClick={getData}>
//               My Trips
//             </button>
//             {
//               <button className={state.button_style_favs} onClick={showFavorites}>
//                 {/* {state.trips.includes(trip._id)} */}
//                 My Favorites
//               </button>
//             }
//           </div>
//           <TripCard deleteOne={deleteOne} trips={state.trips} />
//         </div>
//       </div>
//     );
//   }
// }

// export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TripCard from './TripCard';

const Profile = props => {
  const [trips, setTrips] = useState([]);
  const [likedTrips, setLikedTrips] = useState([]);
  const [buttonStateTrips, setButtonStateTrips] = useState(true);
  const [buttonStyleTrips, setButtonStyleTrips] = useState('sort-button-active');
  const [buttonStateFav, setButtonStateFav] = useState(false);
  const [buttonStyleFavs, setButtonStyleFavs] = useState('sort-button');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('/api/trips/user').then(response => {
      if (buttonStateTrips) {
        setTrips(response.data);
        setButtonStyleTrips('sort-button-active');
        setButtonStateFav('sort-button');
      }
    });
  };

  const showFavorites = () => {
    axios.get(`/api/trips/trips/likedtrips`).then(response => {
      if (!buttonStateFav) {
        setTrips(response.data);
        setButtonStyleTrips('sort-button-active');
        setButtonStateFav('sort-button');
      }
    });
  };

  const deleteOne = id => {
    console.log(id);
    let filteredArray = trips.filter(elem => {
      console.log(elem);
      return id !== elem._id;
    });
    setTrips(filteredArray);
  };

  return (
    <div className="wrapper">
      <div className="profile-wrapper">
        <div className="info-wrapper">
          {/* <div>
          <img className="profile-img" src={props.user.profilePic} alt="Profile Image" />
        </div> */}

          <div className="profile-img-wrapper">
            {props.user.profilePic ? (
              <img className="profile-img" src={props.user.profilePic} alt="Profile" />
            ) : (
              <img className="profile-img" src="./img/user_avatar.png" alt="Profile" />
            )}
          </div>

          <h2>
            {props.user.firstName} {props.user.lastName}
          </h2>
          <p>{props.user.email}</p>
        </div>
      </div>
      <div className="trips-wrapper">
        <div className="sort-button-wrapper">
          <button className={buttonStyleTrips} onClick={getData}>
            My Trips
          </button>
          <button className={buttonStyleFavs} onClick={showFavorites}>
            My Favorites
          </button>
        </div>
        <TripCard deleteOne={deleteOne} trips={trips} />
      </div>
    </div>
  );
};

export default Profile;
