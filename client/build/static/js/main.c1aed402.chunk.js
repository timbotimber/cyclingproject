(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{126:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(52),i=a.n(o),s=(a(60),a(1)),l=a(2),c=a(5),u=a(3),p=a(6),m=a(15),d=(a(61),a(12)),h=a.n(d),g=a(24),f=a.n(g),v=a(4),y=a.n(v),E=function(e){var t=e.tripData,a=t.title,n=(t.origin,t.origin_name),o=(t.destination,t.destination_name),i=(t.lng,t.lat,t.zoom,t.distance),s=t.duration;t.difficulty,t.coordinates,t.uuid,t.waypoints;return r.a.createElement("div",null,r.a.createElement("form",{className:"review-trip",onSubmit:function(t){t.preventDefault();var a=e.tripData,n=a.title,r=a.origin,o=a.origin_name,i=a.destination,s=a.destination_name,l=a.lng,c=a.lat,u=a.zoom,p=a.distance,m=a.duration,d=a.difficulty,h=a.coordinates,g=a.uuid,f=a.waypoints;y.a.post("/api/trips/addTrip",{title:n,origin:r,origin_name:o,destination:i,destination_name:s,lng:l,lat:c,zoom:u,distance:p,duration:m,difficulty:d,coordinates:h,uuid:g,waypoints:f}).then((function(e){console.log(e)}))}},r.a.createElement("h1",null,"Review your trip"),r.a.createElement("label",{htmlFor:"title"},"Trip name"),r.a.createElement("input",{id:"title",name:"title",value:a,onChange:function(t){e.updateTitle(t.target.value)},type:"text",placeholder:"Name your trip"}),r.a.createElement("div",null,r.a.createElement("p",null,"Origin: ",n),r.a.createElement("p",null,"Destination: ",o),r.a.createElement("p",null,"Duration: ",(s/60).toFixed(2)," hours"),r.a.createElement("p",null,"Distance: ",i.toFixed(2)," km"),r.a.createElement("button",null,"Save this trip"))))};h.a.accessToken="pk.eyJ1IjoiamFjcXVlbGluZWNoZW4iLCJhIjoiY2s2ZHB5Y2RxMDkxbzNkbXA2bXVzM3JvbiJ9.pUyDxtMWjGqmGgX4JAdL7g";var b=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={title:"",origin:[],origin_name:"",destination:[],destination_name:"",map:null,draw:null,lng:5,lat:34,zoom:4,uuid:"",duration:"",distance:"",difficulty:"",coordinates:[],waypoints:[],reviewTrip:!1,user:""},a.removeRoute=function(){a.state.map.getSource("route")&&(a.state.map.removeLayer("route"),a.state.map.removeSource("route"))},a.updateRoute=function(){a.removeRoute();var e=a.state.draw.getAll(),t=(document.getElementById("calculated-line"),e.features.length-1),n=e.features[t].geometry.coordinates.join(";");a.getMatch(n)},a.getMatch=function(e){var t="https://api.mapbox.com/directions/v5/mapbox/cycling/"+e+"?geometries=geojson&steps=true&&access_token="+h.a.accessToken,n=new XMLHttpRequest;console.log("req",n),n.responseType="json",n.open("GET",t,!0),n.onload=function(){var e=n.response,t=e.routes[0].geometry.coordinates;console.log("jsonReponse",e);var r=.001*e.routes[0].distance,o="";o=r<50?"Easy":r>=150?"Advanced":"Intermediate",a.setState({distance:r,duration:e.routes[0].duration/60,coordinates:e.routes[0].geometry.coordinates,uuid:e.uuid,waypoints:e.waypoints,origin:e.routes[0].geometry.coordinates[0],destination:e.routes[0].geometry.coordinates[t.length-1],difficulty:o},(function(){console.log(a.state),a.reverseGeocode()})),console.log(e);var i=e.routes[0].geometry;a.addRoute(i),a.getInstructions(e.routes[0])},n.send()},a.addRoute=function(e){a.state.map.getSource("route")?(a.state.map.removeLayer("route"),a.state.map.removeSource("route")):a.state.map.addLayer({id:"route",type:"line",source:{type:"geojson",data:{type:"Feature",properties:{},geometry:e}},layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#3b9ddd","line-width":8,"line-opacity":.8}})},a.getInstructions=function(e){document.getElementById("directions");for(var t=e.legs,a=[],n=0;n<t.length;n++)for(var r=t[n].steps,o=0;o<r.length;o++)a.push("<br><li>"+r[o].maneuver.instruction+"</li>")},a.componentDidMount=function(){var e=a.props.match.params.id;y.a.get("/api/trips/trip/".concat(e)).then((function(e){console.log("response",e),a.setState({trip:e.data})}));var t=new h.a.Map({container:a.mapContainer,style:"mapbox://styles/mapbox/streets-v11",center:[a.state.lng,a.state.lat],zoom:a.state.zoom,duration:a.state.duration,distance:a.state.distance}),n=new f.a({displayControlsDefault:!1,controls:{line_string:!0,trash:!0},styles:[{id:"gl-draw-line",type:"line",filter:["all",["==","$type","LineString"],["!=","mode","static"]],layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#3b9ddd","line-dasharray":[.2,2],"line-width":4,"line-opacity":.7}},{id:"gl-draw-polygon-and-line-vertex-halo-active",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"],["!=","mode","static"]],paint:{"circle-radius":10,"circle-color":"#FFF"}},{id:"gl-draw-polygon-and-line-vertex-active",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"],["!=","mode","static"]],paint:{"circle-radius":6,"circle-color":"#3b9ddd"}}]});a.setState({map:t,draw:n},(function(){var e=a.state,t=e.map,n=e.draw;t.addControl(n),t.on("draw.create",a.updateRoute),t.on("draw.update",a.updateRoute),t.on("draw.delete",a.removeRoute),t.on("move",(function(){a.setState({lng:t.getCenter().lng.toFixed(4),lat:t.getCenter().lat.toFixed(4),zoom:t.getZoom().toFixed(2)})}))}))},a.reverseGeocode=function(){y.a.get("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(a.state.origin[0],",").concat(a.state.origin[1],".json?access_token=").concat(h.a.accessToken)).then((function(e){console.log("full",e);var t=e.data.features;console.log(t);var n=t.find((function(e){return e.place_type.includes("locality")}));if(n)a.setState({origin_name:n.place_name});else{var r=t.find((function(e){return e.place_type.includes("place")}));if(r)a.setState({origin_name:r.place_name});else{var o=t.find((function(e){return e.place_type.includes("region")}));o&&a.setState({origin_name:o.place_name})}}})),y.a.get("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(a.state.destination[0],",").concat(a.state.destination[1],".json?access_token=").concat(h.a.accessToken)).then((function(e){var t=e.data.features,n=t.find((function(e){return e.place_type.includes("locality")}));if(n)a.setState({destination_name:n.place_name});else{var r=t.find((function(e){return e.place_type.includes("place")}));if(r)a.setState({destination_name:r.place_name});else{var o=t.find((function(e){return e.place_type.includes("region")}));o&&a.setState({destination_name:o.place_name})}}}))},a.goToReviewTrip=function(){a.setState({reviewTrip:!a.state.reviewTrip})},a.updateTitle=function(e){a.setState({title:e})},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e,t,a=this;return console.log(this.state),this.state.reviewTrip?(t="Go Back",e=r.a.createElement(E,{tripData:this.state,updateTitle:this.updateTitle})):t="Review Trip",r.a.createElement("div",null,this.state.distance&&r.a.createElement("div",{className:"sidebarStyle"},e,r.a.createElement("button",{onClick:this.goToReviewTrip},t)),!this.state.distance&&r.a.createElement("div",{className:"popUp"},r.a.createElement("p",{className:"with-arrow"},"Plot out your trip and press enter ")),r.a.createElement("div",{ref:function(e){return a.mapContainer=e},className:"mapContainer"}))}}]),t}(r.a.Component),w=a(7),j=function(e){return e.user?(console.log(e.user.email),r.a.createElement("nav",{className:"navbar"},r.a.createElement("p",null,"hey ",e.user.firstName),r.a.createElement("div",{className:"logo"},r.a.createElement(w.b,{to:"/"},"Sykkel")),r.a.createElement("div",{className:"account-links"},r.a.createElement(w.b,{onClick:function(){y.a.delete("/api/auth/logout").then((function(){e.setUser(null)}))},to:"/"},"Logout"),r.a.createElement(w.b,{to:"/profile"},"Profile"),r.a.createElement(w.b,{to:"/plotview"},"Plan"),r.a.createElement(w.b,{to:"/trips"},"Explore")))):r.a.createElement("nav",{className:"navbar"},r.a.createElement("div",{className:"logo"},r.a.createElement("a",{href:"/"},"Sykkel")),r.a.createElement("div",{className:"nav-links"},r.a.createElement(w.b,{to:"/login"},"Log in"),r.a.createElement(w.b,{to:"/signup"},"Sign up"),r.a.createElement(w.b,{to:"/plotview"},"Plan"),r.a.createElement(w.b,{to:"/trips"},"Explore")))},k=a(18),N=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",message:""},a.handleChange=function(e){a.setState(Object(k.a)({},e.target.name,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),y.a.post("/api/auth/login",{email:a.state.email,password:a.state.password}).then((function(e){console.log(e.data),a.props.setUser(e.data),a.props.history.push("/plotview")})).catch((function(e){console.log("error test"),a.setState({message:e.response.data.message}),console.log("message",a.state.message)}))},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"auth-wrapper"},r.a.createElement("div",{className:"auth-box"},r.a.createElement("h2",null,"Log in"),r.a.createElement("div",{className:"auth-form"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"email"}),r.a.createElement("input",{type:"text",id:"email",name:"email",placeholder:"Email",value:this.state.email,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"password"}),r.a.createElement("input",{type:"password",id:"password",name:"password",placeholder:"Password",value:this.state.password,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("button",{className:"auth-btn",type:"submit"},"Log in"))),r.a.createElement("p",null,"or..."),r.a.createElement("div",null,r.a.createElement("a",{href:"".concat("","/api/auth/google")}," ",r.a.createElement("button",{className:"auth-btn google-btn"},"Log in with Google")))),this.state.message&&r.a.createElement("p",null,this.state.message)))}}]),t}(n.Component),x=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={email:"",password:"",message:""},a.handleChange=function(e){a.setState(Object(k.a)({},e.target.name,e.target.value))},a.handleSubmit=function(e){e.preventDefault(),y.a.post("/api/auth/signup",{email:a.state.email,password:a.state.password}).then((function(e){a.props.setUser(e.data),a.props.history.push("/")})).catch((function(e){console.log("error test",e.response.data.message),a.setState({message:e.response.data.message})}))},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"auth-wrapper"},r.a.createElement("div",{className:"auth-box"},r.a.createElement("h2",null,"Create an Account"),r.a.createElement("div",{className:"auth-form"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"firstName"}),r.a.createElement("input",{type:"text",id:"firstName",name:"firstName",placeholder:"first name (like Marcel)",value:this.state.firstName,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"lastName"}),r.a.createElement("input",{type:"text",id:"lastName",name:"lastName",placeholder:"last name (like Riek)",value:this.state.lastName,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"email"}),r.a.createElement("input",{type:"text",id:"email",name:"email",placeholder:"Email",value:this.state.email,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"password"}),r.a.createElement("input",{type:"password",name:"password",id:"password",placeholder:"Password",value:this.state.password,onChange:this.handleChange})),r.a.createElement("div",null,r.a.createElement("button",{className:"auth-btn",type:"submit"},"Sign up"))),r.a.createElement("p",null,"or..."),r.a.createElement("div",null,r.a.createElement("a",{href:"".concat("","/api/auth/google")}," ",r.a.createElement("button",{className:"auth-btn google-btn"},"Sign up with Google")))),this.state.message&&r.a.createElement("p",null,this.state.message)))}}]),t}(n.Component),S=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return console.log("these are our props",this.props.trips),r.a.createElement("div",{className:"trips-list"},this.props.trips.map((function(e){return r.a.createElement("div",{className:"trip-card"},r.a.createElement("div",{className:"primary-content"},r.a.createElement("h2",null,r.a.createElement(w.b,{to:"/trip/".concat(e._id)},e.title)),r.a.createElement("p",null,"From: ",e.origin_name),r.a.createElement("p",null,"To: ",e.destination_name)),r.a.createElement("div",{className:"secondary-content"},r.a.createElement("div",null,r.a.createElement("p",{className:"caption"},"Difficulty"),r.a.createElement("p",{className:"attribute"},e.difficulty?e.difficulty:"N/A")),r.a.createElement("div",null,r.a.createElement("p",{className:"caption"},"Distance"),r.a.createElement("p",{className:"attribute"},e.distance.toFixed(2)," km")),r.a.createElement("div",null,r.a.createElement("p",{className:"caption"},"Duration"),r.a.createElement("p",{className:"attribute"},(e.duration/60).toFixed(2)," hrs")),r.a.createElement("div",null,r.a.createElement("p",{className:"caption"},"Elevation gain"),r.a.createElement("p",{className:"attribute"},"833 m"))))})))}}]),t}(r.a.Component),C=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handleChange=function(e){a.props.updateSearchText(e.target.value)},a.submitSearch=function(e){a.props.executeSearch()},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"search-wrapper"},r.a.createElement("input",{type:"text",placeholder:"Title, origin, or destination",className:"search-input",value:this.props.query,onChange:this.handleChange}),r.a.createElement("button",{className:"search-button",onClick:this.submitSearch},"Search"))}}]),t}(r.a.Component),O=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"filter-panel"},r.a.createElement("div",{className:"search-filters"},r.a.createElement(C,{updateSearchText:this.props.updateSearchText,query:this.props.query,executeSearch:this.props.executeSearch}),r.a.createElement("p",{className:"caption-strong"},"Difficulty"),r.a.createElement("label",{htmlFor:"Easy"},r.a.createElement("input",{className:"checkbox",type:"checkbox",name:"Easy",id:"Easy",checked:this.props.easy,onChange:this.props.mutate}),"Easy"),r.a.createElement("label",{htmlFor:"Intermediate"},r.a.createElement("input",{className:"checkbox",type:"checkbox",name:"Intermediate",id:"Intermediate",checked:this.props.intermediate,onChange:this.props.mutate}),"Intermediate"),r.a.createElement("label",{htmlFor:"Advanced"},r.a.createElement("input",{className:"checkbox",type:"checkbox",name:"Advanced",id:"Advanced",checked:this.props.advanced,onChange:this.props.mutate}),"Advanced"),r.a.createElement("br",null),r.a.createElement("p",{className:"caption-strong"},"Duration"),r.a.createElement("label",{htmlFor:"oneDay"},r.a.createElement("input",{className:"checkbox",type:"checkbox",name:"oneDay",id:"oneDay",checked:this.props.oneDay,onChange:this.props.mutate}),"1 day ride"),r.a.createElement("label",{htmlFor:"threeDay"},r.a.createElement("input",{className:"checkbox",type:"checkbox",name:"threeDay",id:"threeDay",checked:this.props.threeDay,onChange:this.props.mutate}),"3 day ride"),r.a.createElement("label",{htmlFor:"oneWeek"},r.a.createElement("input",{className:"checkbox",type:"checkbox",name:"oneWeek",id:"oneWeek",checked:this.props.oneWeek,onChange:this.props.mutate}),"1 week ride"),r.a.createElement("label",{htmlFor:"hardcore"},r.a.createElement("input",{className:"checkbox",type:"checkbox",name:"hardcore",id:"hardcore",checked:this.props.hardcore,onChange:this.props.mutate}),"Hardcore")),r.a.createElement("div",{className:"filter-panel-button"},r.a.createElement("button",{className:"search-button",onClick:this.props.executeFilter},"Apply filters")))}}]),t}(r.a.Component),_=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={trips:[],query:"",filteredTrips:[],Easy:!1,Intermediate:!1,Advanced:!1,oneDay:!1,threeDay:!1,oneWeek:!1,hardcore:!1},a.getData=function(){y.a.get("/api/trips/addTrip").then((function(e){a.setState({trips:e.data,filteredTrips:e.data})}))},a.updateSearchText=function(e){console.log("onchange query",e),a.setState({query:e})},a.executeSearch=function(){var e=a.state.trips.filter((function(e){if(e.title.includes(a.state.query)||e.origin_name.includes(a.state.query)||e.destination_name.includes(a.state.query))return!0}));console.log("filtered",e),a.setState({filteredTrips:e})},a.mutateCheckboxBoolean=function(e){var t=e.target.name;a.setState(Object(k.a)({},t,!a.state[t]),(function(){console.log(t,a.state[t])}))},a.executeFilter=function(e){e.preventDefault();var t=a.state.trips.filter((function(e){return a.state.Easy&&"Easy"===e.difficulty||a.state.Intermediate&&"Intermediate"===e.difficulty||a.state.Advanced&&"Advanced"===e.difficulty||a.state.oneDay&&e.duration<=360||a.state.threeDay&&360<e.duration<=1080||a.state.oneWeek&&1080<e.duration<=2520||a.state.hardcore&&e.duration>2520}));a.setState({filteredTrips:t})},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getData()}},{key:"render",value:function(){return r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"filter-wrapper"},r.a.createElement(O,{updateSearchText:this.updateSearchText,easy:this.state.easy,mutate:this.mutateCheckboxBoolean,query:this.state.query,executeSearch:this.executeSearch,executeFilter:this.executeFilter})),r.a.createElement("div",{className:"trips-wrapper"},r.a.createElement(S,{trips:this.state.filteredTrips})))}}]),t}(n.Component),T=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return console.log("props",this.props.setUser),console.log("user",this.props.user),r.a.createElement("div",{className:"profile-container"},r.a.createElement("div",{className:"info-wrapper"},r.a.createElement("h2",null,this.props.user.firstName," ",this.props.user.lastName),r.a.createElement("div",{className:"image-wrapper"},r.a.createElement("img",{className:"profile-img",src:this.props.user.profilePic,alt:"Profile Image"})),r.a.createElement("p",null,"Email: ",r.a.createElement("span",null,this.props.user.email))),r.a.createElement("div",{className:"trips-wrapper"},r.a.createElement("h2",null,"My Trips"),r.a.createElement("div",null)))}}]),t}(r.a.Component);h.a.accessToken="pk.eyJ1IjoiamFjcXVlbGluZWNoZW4iLCJhIjoiY2s2ZHB5Y2RxMDkxbzNkbXA2bXVzM3JvbiJ9.pUyDxtMWjGqmGgX4JAdL7g";var F=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={title:"",origin:[],origin_name:"",destination:[],destination_name:"",map:null,draw:null,lng:5,lat:34,zoom:4,uuid:"",duration:"",distance:"",coordinates:[],waypoints:[],reviewTrip:!1},a.removeRoute=function(){a.state.map.getSource("route")&&(a.state.map.removeLayer("route"),a.state.map.removeSource("route"))},a.updateRoute=function(){a.removeRoute();var e=a.state.draw.getAll(),t=(document.getElementById("calculated-line"),e.features.length-1),n=e.features[t].geometry.coordinates.join(";");a.getMatch(n)},a.getMatch=function(e){var t="https://api.mapbox.com/directions/v5/mapbox/cycling/"+e+"?geometries=geojson&steps=true&&access_token="+h.a.accessToken,n=a.props.coordinates.map((function(e){return e.map((function(e){return Number(e.toFixed(11)+"1")}))})),r=new XMLHttpRequest;console.log("req",r),r.responseType="json",r.open("GET",t,!0),r.onload=function(){var e=r.response,t=e.routes[0].geometry.coordinates;console.log("jsonReponse",e),a.setState({distance:.001*e.routes[0].distance,duration:e.routes[0].duration/60,coordinates:e.routes[0].geometry.coordinates.concat(n.reverse()),uuid:e.uuid,waypoints:e.waypoints,origin:e.routes[0].geometry.coordinates[0],destination:e.routes[0].geometry.coordinates[t.length-1]},(function(){console.log(a.state),a.reverseGeocode()})),console.log(e);var o=e.routes[0].geometry;a.addRoute(o),a.getInstructions(e.routes[0])},r.send()},a.addRoute=function(e){a.state.map.getSource("route")?(a.state.map.removeLayer("route"),a.state.map.removeSource("route")):a.state.map.addLayer({id:"route",type:"line",source:{type:"geojson",data:{type:"Feature",properties:{},geometry:e}},layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#3b9ddd","line-width":8,"line-opacity":.8}})},a.getInstructions=function(e){document.getElementById("directions");for(var t=e.legs,a=[],n=0;n<t.length;n++)for(var r=t[n].steps,o=0;o<r.length;o++)a.push("<br><li>"+r[o].maneuver.instruction+"</li>")},a.componentDidMount=function(){var e=a.props.coordinates.map((function(e){return e.reverse(),e}));console.log("initial declaration",e),console.log("testing origin",a.props.origin[0]);var t=new h.a.Map({container:a.mapContainer,style:"mapbox://styles/mapbox/streets-v11",center:[a.props.origin[0],a.props.origin[1]],zoom:a.state.zoom,duration:a.state.duration,distance:a.state.distance}),n=new f.a({displayControlsDefault:!1,controls:{line_string:!0,trash:!0},styles:[{id:"gl-draw-line",type:"line",filter:["all",["==","$type","LineString"],["!=","mode","static"]],layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#3b9ddd","line-dasharray":[.2,2],"line-width":4,"line-opacity":.7}},{id:"gl-draw-polygon-and-line-vertex-halo-active",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"],["!=","mode","static"]],paint:{"circle-radius":10,"circle-color":"#FFF"}},{id:"gl-draw-polygon-and-line-vertex-active",type:"circle",filter:["all",["==","meta","vertex"],["==","$type","Point"],["!=","mode","static"]],paint:{"circle-radius":6,"circle-color":"#3b9ddd"}}]});t.on("load",(function(){console.log("props",a.props);var e=a.props.coordinates.map((function(e){return e.reverse().map((function(e){e.length;return Number(e.toFixed(11)+"1")}))}));console.log("hacked userCoords",e),console.log("Working Coords",[[40.998026998026,14.098482998026],[41.020649020649,14.098132020649],[41.020474020649,14.110666020649],[41.024281020649,14.107097020649],[41.044168020649,14.100123020649],[41.044122020649,14.087687020649],[41.065196020649,14.101628020649],[41.086844020649,14.102352020649],[41.087572020649,14.104416020649],[41.093916020649,14.106363020649],[41.097221020649,14.104472020649],[41.108311020649,14.109544020649],[41.130772020649,14.060963020649],[41.134644020649,14.064113020649],[41.137796020649,14.053121020649]]),t.addLayer({id:"layer1",type:"line",source:{type:"geojson",data:{type:"Feature",geometry:{type:"LineString",coordinates:e}}},layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#888","line-width":8}})})),a.setState({map:t,draw:n},(function(){var e=a.state,t=e.map,n=e.draw;t.addControl(n),t.on("draw.create",a.updateRoute),t.on("draw.update",a.updateRoute),t.on("draw.delete",a.removeRoute),t.on("move",(function(){a.setState({lng:t.getCenter().lng.toFixed(4),lat:t.getCenter().lat.toFixed(4),zoom:t.getZoom().toF})}))}))},a.reverseGeocode=function(){y.a.get("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(a.state.origin[0],",").concat(a.state.origin[1],".json?access_token=").concat(h.a.accessToken)).then((function(e){console.log("full",e);var t=e.data.features;console.log(t);var n=t.find((function(e){return e.place_type.includes("locality")}));if(n)a.setState({origin_name:n.place_name});else{var r=t.find((function(e){return e.place_type.includes("place")}));if(r)a.setState({origin_name:r.place_name});else{var o=t.find((function(e){return e.place_type.includes("region")}));o&&a.setState({origin_name:o.place_name})}}})),y.a.get("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(a.state.destination[0],",").concat(a.state.destination[1],".json?access_token=").concat(h.a.accessToken)).then((function(e){console.log("full",e);var t=e.data.features;console.log(t);var n=t.find((function(e){return e.place_type.includes("locality")}));if(n)a.setState({destination_name:n.place_name});else{var r=t.find((function(e){return e.place_type.includes("place")}));if(r)a.setState({destination_name:r.place_name});else{var o=t.find((function(e){return e.place_type.includes("region")}));o&&a.setState({destination_name:o.place_name})}}}))},a.goToReviewTrip=function(){a.setState({reviewTrip:!a.state.reviewTrip})},a.updateTitle=function(e){a.setState({title:e})},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e,t,a=this;return this.state.reviewTrip?(t="Go Back",e=r.a.createElement(E,{tripData:this.state,updateTitle:this.updateTitle})):t="Save This Trip!",r.a.createElement("div",null,this.state.distance&&r.a.createElement("div",{className:"sidebarStyle"},e,r.a.createElement("button",{onClick:this.goToReviewTrip},t)),!this.state.distance&&r.a.createElement("div",{className:"popUp"},r.a.createElement("p",null,"Plot out your trip and press enter ")),r.a.createElement("div",{ref:function(e){return a.mapContainer=e},className:"mapContainer"}))}}]),t}(r.a.Component),D=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={trip:null},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.id;console.log("ide value",t),y.a.get("/api/trips/trip/".concat(t)).then((function(t){console.log("response",t),e.setState({trip:t.data}),console.log("Test the state:",e.state)}))}},{key:"render",value:function(){var e=this.state.trip;return e?r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,e.title),r.a.createElement("p",null,e.duration),r.a.createElement("p",null,e.distance),r.a.createElement(F,{coordinates:e.coordinates,origin:e.origin})):r.a.createElement("div",null,"No Trips Match Your Search")}}]),t}(n.Component),R=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"home-container"},r.a.createElement("div",{className:"main"},r.a.createElement("h1",null,r.a.createElement("span",null,"Sykkel")),r.a.createElement("div",{className:"intro"},r.a.createElement("p",null,"Cycling. Really far."),r.a.createElement("p",null,"What would you like to do?")),r.a.createElement("div",{className:"home-btns-wrapper"},r.a.createElement(w.b,{to:"/plotview"},r.a.createElement("button",{className:"home-btn"},"Plan a new Trip")),r.a.createElement(w.b,{to:"/trips"},r.a.createElement("button",{className:"home-btn"},"Explore saved Trips")))),r.a.createElement("div",{className:"mainphone"},r.a.createElement("img",{className:"phone",src:"https://github.com/timbotimber/cyclingproject/blob/master/client/public/img/mobile_first.001.png?raw=true",alt:"phone"})))}}]),t}(n.Component),A=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={user:a.props.user},a.setUser=function(e){a.setState({user:e})},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return(r.a.createElement("div",{className:"App"},r.a.createElement(j,{setUser:this.setUser,user:this.state.user}),r.a.createElement("div",{className:"content"},r.a.createElement(m.a,{exact:!0,path:"/",component:R}),r.a.createElement(m.a,{path:"/plotview",component:b}),r.a.createElement(m.a,{path:"/login",render:function(t){return r.a.createElement(N,{history:t.history,setUser:e.setUser})}}),r.a.createElement(m.a,{path:"/signup",render:function(t){return r.a.createElement(x,{history:t.history,setUser:e.setUser})}}),r.a.createElement(m.a,{path:"/trips",component:_}),r.a.createElement(m.a,{path:"/trip/:id",component:D}),r.a.createElement(m.a,{path:"/profile",render:function(t){return r.a.createElement(T,{setUser:e.setUser,user:e.state.user})}}))))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));y.a.get("/api/auth/loggedin").then((function(e){i.a.render(r.a.createElement(w.a,null,r.a.createElement(A,{user:e.data})),document.getElementById("root"))})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},55:function(e,t,a){e.exports=a(126)},60:function(e,t,a){},61:function(e,t,a){}},[[55,1,2]]]);
//# sourceMappingURL=main.c1aed402.chunk.js.map