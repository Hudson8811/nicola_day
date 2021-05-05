document.addEventListener('DOMContentLoaded', function () {
	mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbm92YW50b24iLCJhIjoiY2tvODV3cGl1MGU2NTJuczI2aHpqcG5vcCJ9.wIC5RbDr4E9-SFpTzoRVew';
	const itemsList = document.querySelector('.map-sidebar>ul');
	const items = itemsList.querySelectorAll('li');
	const sidebar = document.querySelector('.map-sidebar');
	let featuresArr = '';

	var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/ivanovanton/cko8de0830l8117p28w7r65rp',
	center: [37.673, 55.6686],
	zoom: 15.5,
	scrollZoom: false
	});

	const getFeatures = () => {
		var features = map.queryRenderedFeatures(event.point, {
			layers: ['nicola']
		  });
		
		  if (!features.length) {
			return;
		  }

		  featuresArr = features;
	}

	let popup;

	const removePopup = () => {
		const map = document.getElementById('map');
		const popups = map.querySelectorAll('.mapboxgl-popup');

		popups.forEach(element => {
			element.remove();
		});
	}

	itemsList.addEventListener('mouseover', event => {
		let target = event.target;
		getFeatures();
		target = target.closest('li')
		for (let idx in items) {
			if (items[idx] === target) {
				for(let feature in featuresArr) {
					if (featuresArr[feature].properties.id == +idx + 1) {
						popup = new mapboxgl.Popup({ offset: [0, -15] })
							.setLngLat(featuresArr[feature].geometry.coordinates)
							.setHTML('<h3>' + featuresArr[feature].properties.title + '</h3>')
							.addTo(map);
					}
				}
			}
		}

		target.addEventListener('mouseout', removePopup);
	});

	itemsList.addEventListener('click', event => {
		let target = event.target;

		target = target.closest('li');

		if (target) {
			sidebar.classList.remove('active');
			document.body.style.overflow = "";
		}
	});

	map.on('click', function(e) {
		var features = map.queryRenderedFeatures(e.point, {
		  layers: ['nicola']
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


	const mapBtn = document.getElementById('mapBtn');

	mapBtn.addEventListener('click', () => {
		sidebar.classList.toggle('active');
		document.body.style.overflow = sidebar.classList.contains('active') ? "hidden" : "";

		mapBtn.textContent = sidebar.classList.contains('active') ? "Вернуться на карту" : "Список площадок"
	});

	map.addControl(new mapboxgl.NavigationControl(), 'top-right');	

	const footer = document.querySelector('footer');

	footer.remove();
});