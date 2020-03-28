const doMapBoxAPICall = (cords, method='cycling') => {
  const url = `https://api.mapbox.com/directions/v5/mapbox/${method}/${e}
    ?geometries=geojson
    &steps=true
    &access_token=${mapboxgl.accessToken}`;

}