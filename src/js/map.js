document.addEventListener('DOMContentLoaded', function () {
	mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbm92YW50b24iLCJhIjoiY2tvODV3cGl1MGU2NTJuczI2aHpqcG5vcCJ9.wIC5RbDr4E9-SFpTzoRVew';
	const URL = "mapbox://styles/ivanovanton/cko8de0830l8117p28w7r65rp";
	const itemsList = document.querySelector('.map-sidebar>ul');

	var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/ivanovanton/cko8de0830l8117p28w7r65rp',
	center: [37.673, 55.667],
	zoom: 15
	});

	itemsList.addEventListener('mouseover', event => {
		
	});

	map.on('click', function(e) {
		var features = map.queryRenderedFeatures(e.point, {
		  layers: ['nicola-day']
		});
	  
		if (!features.length) {
		  return;
		}
	  
		var feature = features[0];
	  
		var popup = new mapboxgl.Popup({ offset: [0, -15] })
		  .setLngLat(feature.geometry.coordinates)
		  .setHTML('<h3>' + feature.properties.title + '</h3>')
		  .addTo(map);
	  });


});