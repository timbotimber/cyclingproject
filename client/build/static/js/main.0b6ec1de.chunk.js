(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{133:function(e,t,a){"use strict";a.r(t);var n,r=a(0),i=a.n(r),o=a(55),c=a.n(o),l=(a(65),a(6)),s=a(2),u=a(13),m=(a(66),a(36)),d=a.n(m),p=a(56),f=a(21),g=a(22),v=a(25),h=a(23),E=a(26),b=a(7),y=a.n(b),N=a(24),w=a.n(N),j=a(1),k=a.n(j),x=Object(u.e)((function(e){var t=e.tripData,a=t.title,n=t.origin_name,r=t.destination_name,o=t.distance,c=t.duration,l=t.elevation_gain;return i.a.createElement("div",null,i.a.createElement("form",{className:"review-trip",onSubmit:function(t){t.preventDefault();var a=e.tripData,n=a.title,r=a.origin,i=a.origin_name,o=a.destination,c=a.destination_name,l=a.lng,s=a.lat,u=a.zoom,m=a.distance,d=a.duration,p=a.difficulty,f=a.elevations,g=a.elevation_gain,v=a.coordinates,h=a.uuid,E=a.waypoints;k.a.post("/api/trips/addTrip",{title:n,origin:r,origin_name:i,destination:o,destination_name:c,lng:l,lat:s,zoom:u,distance:m,duration:d,difficulty:p,elevations:f,elevation_gain:g,coordinates:v,uuid:h,waypoints:E}).then((function(t){console.log(t),e.history.push("/profile")}))}},i.a.createElement("h2",null,"Review your trip"),i.a.createElement("div",{className:"vertical-space"}),i.a.createElement("p",{className:"caption-strong"},"Trip Name:"),i.a.createElement("input",{className:"input-text",id:"title",name:"title",value:a,onChange:function(t){e.updateTitle(t.target.value)},type:"text",placeholder:"Name your trip"}),i.a.createElement("div",{className:"divider"}),i.a.createElement("div",null,i.a.createElement("p",{className:"caption-strong"},"Origin:"),i.a.createElement("p",null,n),i.a.createElement("br",null),i.a.createElement("p",{className:"caption-strong"},"Destination:"),i.a.createElement("p",null,r),i.a.createElement("br",null),i.a.createElement("div",{className:"review-trip-attributes"},i.a.createElement("div",null,i.a.createElement("p",{className:"caption-strong"},"Duration:"),i.a.createElement("p",null,(c/60).toFixed(2)," hours")),i.a.createElement("div",null,i.a.createElement("p",{className:"caption-strong"},"Distance:"),i.a.createElement("p",null,o.toFixed(2)," km")),i.a.createElement("div",null,i.a.createElement("p",{className:"caption-strong"},"Elevation gain:"),i.a.createElement("p",null,l," m"))),i.a.createElement("br",null),i.a.createElement("button",{className:"button-solid"},"Save this trip"))))}));y.a.accessToken="pk.eyJ1IjoiamFjcXVlbGluZWNoZW4iLCJhIjoiY2s2ZHB5Y2RxMDkxbzNkbXA2bXVzM3JvbiJ9.pUyDxtMWjGqmGgX4JAdL7g";var _=function(e){function t(){var e,a;Object(f.a)(this,t);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(a=Object(v.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(i)))).state={title:"",origin:[],origin_name:"",destination:[],destination_name:"",map:null,draw:null,lng:13,lat:52,zoom:5,uuid:"",duration:"",distance:"",difficulty:"",elevations:[],elevation_gain:0,coordinates:[],waypoints:[],reviewTrip:!1,user:""},a.removeRoute=function(){a.state.map.getSource("route")&&(a.state.map.removeLayer("route"),a.state.map.removeSource("route"))},a.updateRoute=function(){a.removeRoute();var e=a.state.draw.getAll(),t=e.features.length-1,n=e.features[t].geometry.coordinates.join(";");a.getMatch(n)},a.getMatch=function(e){var t="https://api.mapbox.com/directions/v5/mapbox/cycling/"+e+"?geometries=geojson&steps=true&&access_token="+y.a.accessToken,n=new XMLHttpRequest;n.responseType="json",n.open("GET",t,!0),n.onload=function(){var e=n.response,t=e.routes[0].geometry.coordinates,r=.001*e.routes[0].distance,i="";i=r<50?"Easy":r>=150?"Advanced":"Intermediate",a.setState({distance:r,duration:e.routes[0].duration/60,coordinates:e.routes[0].geometry.coordinates,uuid:e.uuid,waypoints:e.waypoints,origin:e.routes[0].geometry.coordinates[0],destination:e.routes[0].geometry.coordinates[t.length-1],difficulty:i},(function(){a.snapToBounds(),a.reverseGeocode(),a.getElevations().then((function(e){a.calculateGain(e)}))}));var o=e.routes[0].geometry;a.addRoute(o),a.getInstructions(e.routes[0])},n.send()},a.getElevations=Object(p.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],n=a.state.coordinates.map((function(e){return k.a.get("https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/".concat(e[0],",").concat(e[1],".json?layers=contour&limit=50&access_token=").concat(y.a.accessToken)).then((function(e){e=e.data.features;var a=!0,n=!1,r=void 0;try{for(var i,o=e[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var c=i.value;t.push(c.properties.ele)}}catch(l){n=!0,r=l}finally{try{a||null==o.return||o.return()}finally{if(n)throw r}}}))})),e.next=4,Promise.all(n);case 4:return a.setState({elevations:t}),e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)}))),a.calculateGain=function(e){for(var t=0,n=1;n<e.length;n++)e[n]>e[n-1]&&(t+=e[n]-e[n-1]);var r=t/2;a.setState({elevation_gain:r})},a.addRoute=function(e){a.state.map.getSource("route")?(a.state.map.removeLayer("route"),a.state.map.removeSource("route")):a.state.map.addLayer({id:"route",type:"line",source:{type:"geojson",data:{type:"Feature",properties:{},geometry:e}},layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#ff6962","line-width":8,"line-opacity":.8}})},a.getInstructions=function(e){for(var t=e.legs,a=[],n=0;n<t.length;n++)for(var r=t[n].steps,i=0;i<r.length;i++)a.push("<br><li>"+r[i].maneuver.instruction+"</li>")},a.componentDidMount=function(){n=new y.a.Map({container:a.mapContainer,style:"mapbox://styles/mapbox/outdoors-v11",center:[a.state.lng,a.state.lat],zoom:a.state.zoom,duration:a.state.duration,distance:a.state.distance});var e=new w.a({displayControlsDefault:!1,controls:{line_string:!0,trash:!0},styles:[{id:"gl-draw-line",type:"line",filter:["all",["==","$type","LineString"],["!=","mode","static"]],layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#ff6962","line-dasharray":[.2,2],"line-width":4,"line-opacity":1}},{id:"gl-draw-polygon-and-line-vertex-halo-active",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"],["!=","mode","static"]],paint:{"circle-radius":10,"circle-color":"#FFF"}},{id:"gl-draw-polygon-and-line-vertex-active",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"],["!=","mode","static"]],paint:{"circle-radius":6,"circle-color":"#ff6962"}}]});a.setState({map:n,draw:e},(function(){var e=a.state,t=e.map,n=e.draw;t.addControl(n),t.on("draw.create",a.updateRoute),t.on("draw.update",a.updateRoute),t.on("draw.delete",a.removeRoute),t.on("move",(function(){a.setState({lng:t.getCenter().lng.toFixed(4),lat:t.getCenter().lat.toFixed(4),zoom:t.getZoom().toFixed(2)})}))}))},a.componentDidUpdate=function(e){var t=a.props.match.params.id;e.trip!==a.state.trip&&k.a.get("/api/trips/trip/".concat(t)).then((function(e){console.log("response",e),a.setState({trip:e.data})}))},a.reverseGeocode=function(){k.a.get("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(a.state.origin[0],",").concat(a.state.origin[1],".json?access_token=").concat(y.a.accessToken)).then((function(e){var t=e.data.features,n=t.find((function(e){return e.place_type.includes("locality")}));if(n)a.setState({origin_name:n.place_name});else{var r=t.find((function(e){return e.place_type.includes("place")}));if(r)a.setState({origin_name:r.place_name});else{var i=t.find((function(e){return e.place_type.includes("region")}));i&&a.setState({origin_name:i.place_name})}}})),k.a.get("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(a.state.destination[0],",").concat(a.state.destination[1],".json?access_token=").concat(y.a.accessToken)).then((function(e){var t=e.data.features,n=t.find((function(e){return e.place_type.includes("locality")}));if(n)a.setState({destination_name:n.place_name});else{var r=t.find((function(e){return e.place_type.includes("place")}));if(r)a.setState({destination_name:r.place_name});else{var i=t.find((function(e){return e.place_type.includes("region")}));i&&a.setState({destination_name:i.place_name})}}}))},a.goToReviewTrip=function(){a.setState({reviewTrip:!a.state.reviewTrip})},a.updateTitle=function(e){a.setState({title:e})},a.snapToBounds=function(){var e=a.state.coordinates,t=e.reduce((function(e,t){return e.extend(t)}),new y.a.LngLatBounds(e[0],e[0]));n.fitBounds(t,{padding:100})},a}return Object(E.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e,t,a=this;return this.state.reviewTrip?(t="Go Back",e=i.a.createElement("div",{className:"sidebarReview"},i.a.createElement(x,{tripData:this.state,updateTitle:this.updateTitle}))):t="Check out your Details!",i.a.createElement("div",null,this.state.distance&&i.a.createElement("div",{className:"sidebar"},e,i.a.createElement("button",{className:"button-solid",onClick:this.goToReviewTrip},t)),!this.state.distance&&i.a.createElement("div",{className:"popUp"},i.a.createElement("p",{className:"caption-strong"},"Plot out your trip and press enter ")),i.a.createElement("div",{ref:function(e){return a.mapContainer=e},className:"mapContainer"}))}}]),t}(i.a.Component),S=a(3),O=function(e){return e.user?i.a.createElement("nav",{className:"navbar"},e.user.firstName&&i.a.createElement("div",{className:"nav-greeting"},i.a.createElement("p",null,i.a.createElement("span",{role:"img","aria-label":"wave"},"\ud83d\udc4b\ud83c\udffb"),"Hey ",e.user.firstName,"!")),i.a.createElement("div",{className:"logo"},i.a.createElement(S.b,{to:"/"},"Sykkel")),i.a.createElement("div",{className:"nav-links"},i.a.createElement(S.b,{to:"/profile"},"Profile"),i.a.createElement(S.b,{to:"/plotview"},"Plan"),i.a.createElement(S.b,{to:"/trips"},"Explore"),i.a.createElement(S.b,{onClick:function(){k.a.delete("/api/auth/logout").then((function(){e.setUser(null)}))},to:"/"},"Logout"))):i.a.createElement("nav",{className:"navbar"},i.a.createElement("div",{className:"nav-greeting"}),i.a.createElement("div",{className:"logo"},i.a.createElement("a",{href:"/"},"Sykkel")),i.a.createElement("div",{className:"nav-links"},i.a.createElement(S.b,{to:"/plotview"},"Plan"),i.a.createElement(S.b,{to:"/trips"},"Explore"),i.a.createElement(S.b,{to:"/login"},"Log in"),i.a.createElement(S.b,{to:"/signup"},i.a.createElement("button",{className:"button-pill"},"Sign up"))))},T=a(12),C=function(e){var t=Object(r.useState)({email:"",password:"",message:""}),a=Object(s.a)(t,2),n=a[0],o=a[1],c=function(e){o(Object(l.a)({},n,Object(T.a)({},e.target.name,e.target.value)))};return i.a.createElement("div",{className:"auth-wrapper"},i.a.createElement("div",{className:"auth-box"},i.a.createElement("h2",null,"Log in"),i.a.createElement("div",{className:"auth-form"},i.a.createElement("form",{onSubmit:function(t){t.preventDefault(),k.a.post("/api/auth/login",{email:n.email,password:n.password}).then((function(t){console.log(t.data),e.setUser(t.data),e.history.push("/plotview")})).catch((function(e){console.log("error test"),o(Object(l.a)({},n,{message:e.response.data.message})),console.log("message",n.message)}))}},i.a.createElement("div",null,i.a.createElement("label",{htmlFor:"email"}),i.a.createElement("input",{type:"text",id:"email",name:"email",placeholder:"Email",value:n.email,onChange:c})),i.a.createElement("div",null,i.a.createElement("label",{htmlFor:"password"}),i.a.createElement("input",{type:"password",id:"password",name:"password",placeholder:"Password",value:n.password,onChange:c})),i.a.createElement("div",null,i.a.createElement("button",{className:"auth-btn",type:"submit"},"Log in"))),i.a.createElement("p",{id:"or-google"},"or"),i.a.createElement("div",null,i.a.createElement("a",{href:"".concat("","/api/auth/google")}," ",i.a.createElement("button",{className:"auth-btn sort-button"},"Log in with Google"))),i.a.createElement("p",{id:"auth-line"},"No account yet?"," ",i.a.createElement(S.b,{className:"auth-links",to:"/signup"},"Signup"))),n.message&&i.a.createElement("p",null,n.message)))},F=function(e){var t=Object(r.useState)({email:"",password:"",message:""}),a=Object(s.a)(t,2),n=a[0],o=a[1],c=function(e){o(Object(l.a)({},n,Object(T.a)({},e.target.name,e.target.value)))};return i.a.createElement("div",{className:"auth-wrapper"},i.a.createElement("div",{className:"auth-box"},i.a.createElement("h2",null,"Create an Account"),i.a.createElement("div",{className:"auth-form"},i.a.createElement("form",{onSubmit:function(t){t.preventDefault(),k.a.post("/api/auth/signup",{email:n.email,password:n.password}).then((function(t){e.setUser(t.data),e.history.push("/")})).catch((function(e){console.log("error test",e.response.data.message),o(Object(l.a)({},n,{message:e.response.data.message}))}))}},i.a.createElement("div",null,i.a.createElement("label",{htmlFor:"firstName"}),i.a.createElement("input",{type:"text",id:"firstName",name:"firstName",placeholder:"First name",value:n.firstName,onChange:c})),i.a.createElement("div",null,i.a.createElement("label",{htmlFor:"lastName"}),i.a.createElement("input",{type:"text",id:"lastName",name:"lastName",placeholder:"Last name",value:n.lastName,onChange:c})),i.a.createElement("div",null,i.a.createElement("label",{htmlFor:"email"}),i.a.createElement("input",{type:"text",id:"email",name:"email",placeholder:"Email",value:n.email,onChange:c})),i.a.createElement("div",null,i.a.createElement("label",{htmlFor:"password"}),i.a.createElement("input",{type:"password",name:"password",id:"password",placeholder:"Password",value:n.password,onChange:c})),i.a.createElement("div",null,i.a.createElement("button",{className:"auth-btn",type:"submit"},"Sign up"))),i.a.createElement("p",{id:"or-google"},"or"),i.a.createElement("div",null,i.a.createElement("a",{href:"".concat("","/api/auth/google")}," ",i.a.createElement("button",{className:"auth-btn sort-button"},"Sign up with Google"))),i.a.createElement("p",{id:"auth-line"},"Already have an account?"," ",i.a.createElement(S.b,{className:"auth-links",to:"/login"},"Login"))),n.message&&i.a.createElement("p",null,n.message)))},D=function(e){var t=Object(r.useState)([]),a=Object(s.a)(t,2),n=a[0],o=a[1],c=Object(r.useState)([]),l=Object(s.a)(c,2),u=l[0],m=l[1];Object(r.useEffect)((function(){d(),p()}),[]);var d=function(){k.a.get("/api/auth/likedtrips").then((function(e){o(e.data)}))},p=function(){k.a.get("/api/auth/usertrips").then((function(e){m(e.data)}))};return i.a.createElement("div",{className:"trips-list"},e.trips.map((function(t){return i.a.createElement("div",{key:t._id,className:"trip-card"},i.a.createElement("div",{className:"primary-content"},i.a.createElement("div",null,i.a.createElement("h2",null,i.a.createElement(S.b,{to:"/trip/".concat(t._id)},t.title)),i.a.createElement("p",null,"From: ",t.origin_name),i.a.createElement("p",null,"To: ",t.destination_name)),i.a.createElement("div",{key:t._id,className:"favebutton"},i.a.createElement("div",{onClick:function(){return e=t._id,void k.a.post("/api/trips/updatefaves/".concat(e)).then((function(e){o(e.data.liked_trips)}));var e}},n.includes(t._id)?i.a.createElement(i.a.Fragment,null,i.a.createElement("img",{className:"heart",src:"./img/heart.png",alt:"heart"})):i.a.createElement(i.a.Fragment,null,i.a.createElement("img",{className:"heart",src:"./img/empty_heart.png",alt:"empty heart"}))))),i.a.createElement("div",{className:"secondary-content"},i.a.createElement("div",null,i.a.createElement("p",{className:"caption"},"Difficulty"),i.a.createElement("p",{className:"attribute"},t.difficulty?t.difficulty:"N/A")),i.a.createElement("div",null,i.a.createElement("p",{className:"caption"},"Distance"),i.a.createElement("p",{className:"attribute"},t.distance.toFixed(2)," km")),i.a.createElement("div",null,i.a.createElement("p",{className:"caption"},"Duration"),i.a.createElement("p",{className:"attribute"},(t.duration/60).toFixed(2)," hrs")),i.a.createElement("div",null,i.a.createElement("p",{className:"caption"},"Elevation gain"),i.a.createElement("p",{className:"attribute"},i.a.createElement(S.b,{to:"chart/".concat(t._id)},t.elevation_gain?t.elevation_gain+" m":"N/A"))),i.a.createElement("div",{className:"delete-attribute"},u._id===t.user?i.a.createElement("button",{onClick:function(){return a=t._id,void k.a.post("/api/trips/delete/".concat(a)).then((function(t){e.deleteOne(a)}));var a}},i.a.createElement("img",{src:"/img/trash_icon.png",alt:"delete"})):i.a.createElement(i.a.Fragment,null))))})))},R=function(e){return i.a.createElement("div",{className:"search-wrapper"},i.a.createElement("input",{type:"text",placeholder:"Title, origin, or destination",className:"search-input",value:e.query,onChange:function(t){e.updateSearchText(t.target.value)}}),i.a.createElement("button",{className:"search-button",onClick:function(t){e.executeSearch()}},"Search"))},L=function(e){return i.a.createElement("div",{className:"filter-panel"},i.a.createElement("div",{className:"search-filters"},i.a.createElement(R,{updateSearchText:e.updateSearchText,query:e.query,executeSearch:e.executeSearch}),i.a.createElement("p",{className:"caption-strong"},"Difficulty"),i.a.createElement("label",{htmlFor:"Easy"},i.a.createElement("input",{className:"checkbox",type:"checkbox",name:"Easy",id:"Easy",checked:e.easy,onChange:e.mutate}),"Easy"),i.a.createElement("label",{htmlFor:"Intermediate"},i.a.createElement("input",{className:"checkbox",type:"checkbox",name:"Intermediate",id:"Intermediate",checked:e.intermediate,onChange:e.mutate}),"Intermediate"),i.a.createElement("label",{htmlFor:"Advanced"},i.a.createElement("input",{className:"checkbox",type:"checkbox",name:"Advanced",id:"Advanced",checked:e.advanced,onChange:e.mutate}),"Advanced"),i.a.createElement("br",null),i.a.createElement("p",{className:"caption-strong"},"Duration"),i.a.createElement("label",{htmlFor:"oneDay"},i.a.createElement("input",{className:"checkbox",type:"checkbox",name:"oneDay",id:"oneDay",checked:e.oneDay,onChange:e.mutate}),"1 day ride"),i.a.createElement("label",{htmlFor:"threeDay"},i.a.createElement("input",{className:"checkbox",type:"checkbox",name:"threeDay",id:"threeDay",checked:e.threeDay,onChange:e.mutate}),"3 day ride"),i.a.createElement("label",{htmlFor:"oneWeek"},i.a.createElement("input",{className:"checkbox",type:"checkbox",name:"oneWeek",id:"oneWeek",checked:e.oneWeek,onChange:e.mutate}),"1 week ride"),i.a.createElement("label",{htmlFor:"hardcore"},i.a.createElement("input",{className:"checkbox",type:"checkbox",name:"hardcore",id:"hardcore",checked:e.hardcore,onChange:e.mutate}),"Hardcore")),i.a.createElement("div",{className:"filter-panel-button"},i.a.createElement("button",{className:"search-button",onClick:e.executeFilter},"Apply filters")))},A=function(e){var t=Object(r.useState)({user:e.user,trips:[],query:"",filteredTrips:[],Easy:!1,Intermediate:!1,Advanced:!1,oneDay:!1,threeDay:!1,oneWeek:!1,hardcore:!1}),a=Object(s.a)(t,2),n=a[0],o=a[1];Object(r.useEffect)((function(){c()}),[]);var c=function(){k.a.get("/api/trips/addTrip").then((function(e){o(Object(l.a)({},n,{trips:e.data,filteredTrips:e.data}))}))};return i.a.createElement("div",{className:"wrapper"},i.a.createElement("div",{className:"filter-wrapper"},i.a.createElement(L,{updateSearchText:function(e){o(Object(l.a)({},n,{query:e}))},easy:n.easy,mutate:function(e){var t=e.target.name;o(Object(l.a)({},n,Object(T.a)({},t,!n[t])),(function(){}))},query:n.query,executeSearch:function(){var e=n.trips.filter((function(e){if(e.title.includes(n.query)||e.origin_name.includes(n.query)||e.destination_name.includes(n.query))return!0}));o(Object(l.a)({},n,{filteredTrips:e}))},executeFilter:function(e){e.preventDefault();var t=n.trips.filter((function(e){return n.Easy&&"Easy"===e.difficulty||n.Intermediate&&"Intermediate"===e.difficulty||n.Advanced&&"Advanced"===e.difficulty||n.oneDay&&e.duration<=360||n.threeDay&&360<=e.duration<=1080||n.oneWeek&&1080<=e.duration<=2520||n.hardcore&&e.duration>2520}));o({filteredTrips:t})}})),i.a.createElement("div",{className:"trips-wrapper"},i.a.createElement(D,{user:n.user,deleteOne:function(e){var t=n.filteredTrips.filter((function(t){return e!==t._id}));o(Object(l.a)({},n,{filteredTrips:t}))},trips:n.filteredTrips})))},G=function(e){var t=Object(r.useState)([]),a=Object(s.a)(t,2),n=a[0],o=a[1],c=Object(r.useState)([]),l=Object(s.a)(c,2),u=(l[0],l[1],Object(r.useState)(!0)),m=Object(s.a)(u,2),d=m[0],p=(m[1],Object(r.useState)("sort-button-active")),f=Object(s.a)(p,2),g=f[0],v=f[1],h=Object(r.useState)(!1),E=Object(s.a)(h,2),b=E[0],y=E[1],N=Object(r.useState)("sort-button"),w=Object(s.a)(N,2),j=w[0];w[1];Object(r.useEffect)((function(){x()}),[]);var x=function(){k.a.get("/api/trips/user").then((function(e){d&&(o(e.data),v("sort-button-active"))}))};return i.a.createElement("div",{className:"wrapper"},i.a.createElement("div",{className:"profile-wrapper"},i.a.createElement("div",{className:"info-wrapper"},i.a.createElement("div",{className:"profile-img-wrapper"},e.user.profilePic?i.a.createElement("img",{className:"profile-img",src:e.user.profilePic,alt:"Profile"}):i.a.createElement("img",{className:"profile-img",src:"./img/user_avatar.png",alt:"Profile"})),i.a.createElement("h2",null,e.user.firstName," ",e.user.lastName),i.a.createElement("p",null,e.user.email))),i.a.createElement("div",{className:"trips-wrapper"},i.a.createElement("div",{className:"sort-button-wrapper"},i.a.createElement("button",{className:g,onClick:x},"My Trips"),i.a.createElement("button",{className:j,onClick:function(){k.a.get("/api/trips/trips/likedtrips").then((function(e){b||(o(e.data),y("sort-button"))}))}},"My Favorites")),i.a.createElement(D,{deleteOne:function(e){console.log(e);var t=n.filter((function(t){return e!==t._id}));o(t)},user:e.user,trips:n})))};y.a.accessToken="pk.eyJ1IjoiamFjcXVlbGluZWNoZW4iLCJhIjoiY2s2ZHB5Y2RxMDkxbzNkbXA2bXVzM3JvbiJ9.pUyDxtMWjGqmGgX4JAdL7g";var I=function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(v.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={title:"",origin:[],origin_name:"",destination:[],destination_name:"",map:null,draw:null,lng:5,lat:34,zoom:4,uuid:"",duration:"",distance:"",coordinates:[],waypoints:[],reviewTrip:!1},a.removeRoute=function(){a.state.map.getSource("route")&&(a.state.map.removeLayer("route"),a.state.map.removeSource("route"))},a.updateRoute=function(){a.removeRoute();var e=a.state.draw.getAll(),t=e.features.length-1,n=e.features[t].geometry.coordinates.join(";");a.getMatch(n)},a.getMatch=function(e){var t="https://api.mapbox.com/directions/v5/mapbox/cycling/"+e+"?geometries=geojson&steps=true&&access_token="+y.a.accessToken,n=new XMLHttpRequest;n.responseType="json",n.open("GET",t,!0),n.onload=function(){var e=n.response,t=a.props.coordinates.map((function(e){return e})),r=e.routes[0].geometry.coordinates,i=t.concat(r);a.setState({distance:.001*e.routes[0].distance,duration:e.routes[0].duration/60,coordinates:i,uuid:e.uuid,waypoints:e.waypoints,origin:e.routes[0].geometry.coordinates[0],destination:e.routes[0].geometry.coordinates[r.length-1]},(function(){a.reverseGeocode()}));var o=e.routes[0].geometry;a.addRoute(o),a.getInstructions(e.routes[0])},n.send()},a.addRoute=function(e){a.state.map.getSource("route")?(a.state.map.removeLayer("route"),a.state.map.removeSource("route")):a.state.map.addLayer({id:"route",type:"line",source:{type:"geojson",data:{type:"Feature",properties:{},geometry:e}},layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#3b9ddd","line-width":8,"line-opacity":.8}})},a.getInstructions=function(e){for(var t=e.legs,a=[],n=0;n<t.length;n++)for(var r=t[n].steps,i=0;i<r.length;i++)a.push("<br><li>"+r[i].maneuver.instruction+"</li>")},a.componentDidMount=function(){var e=new y.a.Map({container:a.mapContainer,style:"mapbox://styles/mapbox/streets-v11",center:[a.props.origin[0],a.props.origin[1]],zoom:a.state.zoom,duration:a.state.duration,distance:a.state.distance}),t=new w.a({displayControlsDefault:!1,controls:{line_string:!0,trash:!0},styles:[{id:"gl-draw-line",type:"line",filter:["all",["==","$type","LineString"],["!=","mode","static"]],layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#3b9ddd","line-dasharray":[.2,2],"line-width":4,"line-opacity":.7}},{id:"gl-draw-polygon-and-line-vertex-halo-active",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"],["!=","mode","static"]],paint:{"circle-radius":10,"circle-color":"#FFF"}},{id:"gl-draw-polygon-and-line-vertex-active",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"],["!=","mode","static"]],paint:{"circle-radius":6,"circle-color":"#3b9ddd"}}]});e.on("load",(function(){var t=a.props.coordinates.map((function(e){return e}));e.addLayer({id:"layer1",type:"line",source:{type:"geojson",data:{type:"Feature",geometry:{type:"LineString",coordinates:t}}},layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#ff6962","line-width":8,"line-opacity":.8}})})),a.setState({map:e,draw:t},(function(){var e=a.state,t=e.map,n=e.draw;t.addControl(n),t.on("draw.create",a.updateRoute),t.on("draw.update",a.updateRoute),t.on("draw.delete",a.removeRoute),t.on("move",(function(){a.setState({lng:t.getCenter().lng.toFixed(4),lat:t.getCenter().lat.toFixed(4),zoom:t.getZoom().toF})}))}))},a.reverseGeocode=function(){k.a.get("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(a.state.origin[0],",").concat(a.state.origin[1],".json?access_token=").concat(y.a.accessToken)).then((function(e){var t=e.data.features,n=t.find((function(e){return e.place_type.includes("locality")}));if(n)a.setState({origin_name:n.place_name});else{var r=t.find((function(e){return e.place_type.includes("place")}));if(r)a.setState({origin_name:r.place_name});else{var i=t.find((function(e){return e.place_type.includes("region")}));i&&a.setState({origin_name:i.place_name})}}})),k.a.get("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(a.state.destination[0],",").concat(a.state.destination[1],".json?access_token=").concat(y.a.accessToken)).then((function(e){var t=e.data.features,n=t.find((function(e){return e.place_type.includes("locality")}));if(n)a.setState({destination_name:n.place_name});else{var r=t.find((function(e){return e.place_type.includes("place")}));if(r)a.setState({destination_name:r.place_name});else{var i=t.find((function(e){return e.place_type.includes("region")}));i&&a.setState({destination_name:i.place_name})}}}))},a.goToReviewTrip=function(){a.setState({reviewTrip:!a.state.reviewTrip})},a.updateTitle=function(e){a.setState({title:e})},a}return Object(E.a)(t,e),Object(g.a)(t,[{key:"render",value:function(){var e,t,a=this;return this.state.reviewTrip?(t="Go Back",e=i.a.createElement("div",{className:"sidebarReview"},i.a.createElement(x,{tripData:this.state,updateTitle:this.updateTitle}))):t="Review Trip",i.a.createElement("div",null,this.state.distance&&i.a.createElement("div",{className:"sidebar"},e,i.a.createElement("button",{className:"button-ghost",onClick:this.goToReviewTrip},t)," "),!this.state.distance&&i.a.createElement("div",{className:"popUp"},i.a.createElement("p",{className:"caption-strong"},"Plot out your trip and press enter ")),i.a.createElement("div",{ref:function(e){return a.mapContainer=e},className:"mapContainer"}))}}]),t}(i.a.Component),M=function(e){var t=Object(r.useState)(null),a=Object(s.a)(t,2),n=a[0],o=a[1];return Object(r.useEffect)((function(){var t=e.match.params.id;k.a.get("/api/trips/trip/".concat(t)).then((function(e){o(e.data)}))}),[]),n?i.a.createElement(I,{coordinates:n.coordinates,origin:n.origin}):i.a.createElement("div",null,"Jackie and the Ferry Boys working their magic... ")},P=function(){return i.a.createElement("div",{className:"home-container"},i.a.createElement("div",{className:"home-left"},i.a.createElement("div",{className:"main"},i.a.createElement("h1",null,"Cycling."),i.a.createElement("h1",null,"Really far."),i.a.createElement("p",{className:"intro-description"},"Introducing Sykkel. A social platform for cyclists to discover and plan long-distance cycling trips in and around Europe."),i.a.createElement("div",{className:"home-btns-wrapper"},i.a.createElement(S.b,{to:"/trips"},i.a.createElement("button",{className:"button-solid-dark"},"Explore routes")),i.a.createElement(S.b,{to:"/plotview"},i.a.createElement("button",{className:"button-solid"},"Plan your own"))))),i.a.createElement("div",{className:"home-right"},i.a.createElement("img",{src:"/img/home-teaser.png",alt:"home-teaser"})))},q=a(59),z=a.n(q),W=function(e){var t=Object(r.useState)([]),a=Object(s.a)(t,2),n=a[0],o=a[1],c=Object(r.useState)([]),l=Object(s.a)(c,2),u=(l[0],l[1]),m=Object(r.useState)([]),d=Object(s.a)(m,2),p=(d[0],d[1]),f=Object(r.useState)(!1),g=Object(s.a)(f,2),v=g[0],h=g[1],E=Object(r.useRef)();return Object(r.useEffect)((function(){(function(){var t=e.match.params.id;return k.a.get("/api/trips/trip/".concat(t)).then((function(e){o(e.data.elevations),u(e.data.origin),p(e.data.destination)}))})().then((function(e){!function(){for(var e=E.current.getContext("2d"),t=[],a=0;a<n.length;a+=1)t.push(" ");new z.a(e,{type:"line",data:{labels:t,datasets:[{label:"elevation / m",data:n,fill:!0,backgroundColor:"rgba(255, 105, 98, 0.2)",borderColor:"#ff6962",borderWidth:2}]},options:{bezierCurve:!0,elements:{point:{radius:0}},scales:{xAxes:[{gridLines:{color:"rgba(0, 0, 0, 0)"}}],yAxes:[{gridLines:{color:"rgba(0, 0, 0, 0)"}}]}}}),h(!0)}()}))}),[v]),i.a.createElement("div",{className:"chart"},i.a.createElement("canvas",{id:"myChart",ref:E}))},J=function(e){var t=Object(r.useState)({user:e.user}),a=Object(s.a)(t,2),n=a[0],o=a[1],c=function(e){o(Object(l.a)({},n,{user:e}))};return i.a.createElement("div",{className:"App"},i.a.createElement(O,{setUser:c,user:n.user}),i.a.createElement("div",{className:"content"},i.a.createElement(u.a,{exact:!0,path:"/",component:P}),i.a.createElement(u.a,{path:"/plotview",component:_}),i.a.createElement(u.a,{path:"/login",render:function(e){return i.a.createElement(C,{history:e.history,setUser:c})}}),i.a.createElement(u.a,{path:"/signup",render:function(e){return i.a.createElement(F,{history:e.history,setUser:c})}}),i.a.createElement(u.a,{exact:!0,path:"/trips",render:function(e){return i.a.createElement(A,{user:n.user})}}),i.a.createElement(u.a,{path:"/chart/:id",component:W}),i.a.createElement(u.a,{path:"/trip/:id",component:M}),i.a.createElement(u.a,{path:"/profile",render:function(e){return i.a.createElement(G,{setUser:c,user:n.user})}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));k.a.get("/api/auth/loggedin").then((function(e){c.a.render(i.a.createElement(S.a,null,i.a.createElement(J,{user:e.data})),document.getElementById("root"))})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},60:function(e,t,a){e.exports=a(133)},65:function(e,t,a){},66:function(e,t,a){}},[[60,1,2]]]);
//# sourceMappingURL=main.0b6ec1de.chunk.js.map