document.addEventListener('DOMContentLoaded', function () {
	mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbm92YW50b24iLCJhIjoiY2tvODV3cGl1MGU2NTJuczI2aHpqcG5vcCJ9.wIC5RbDr4E9-SFpTzoRVew';
	const sidebar = document.querySelector('.map-sidebar');
	const mapBtn = document.getElementById('mapBtn');
	let winWidth = window.innerWidth;
	let featuresArr = '';

	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/ivanovanton/cko8de0830l8117p28w7r65rp',
		center: winWidth <= 999 ? [37.6734, 55.668] : [37.6734, 55.6685],
		zoom: winWidth <= 999 ? 14.5 : 15.3,
		scrollZoom: false
	});

	const createPopup = (item) => {
		var popup = new mapboxgl.Popup({ 
			offset: [0, -15],
			closeButton: false
		})
			.setLngLat(item.geometry.coordinates)
			.setHTML('<h3>' + item.properties.title + '</h3>')
			.addTo(map);
	}

	const removePopup = () => {
		const map = document.getElementById('map');
		const popups = map.querySelectorAll('.mapboxgl-popup');

		popups.forEach(element => {
			element.remove();
		});
	}

	const createSidebarItems = (features) => {
		const list = document.createElement('ul');

		sidebar.append(list);

		features.forEach(feature => {
			const sidebarItem = document.createElement('li');
			const sidebarItemBtn = document.createElement('button');
			sidebarItemBtn.textContent = feature.properties.title;
			sidebarItemBtn.id = feature.properties.id;
			
			const btn = document.getElementById(`${feature.properties.id}`);

			if (!btn) {
				sidebarItem.append(sidebarItemBtn);
				list.append(sidebarItem);
			}
		});
	}

	const mapMouseoverHandler = (event) => {
		let target = event.target;

		target = target.closest('button');
		
		if (target) {
			const targetPoints = featuresArr.filter(feature => feature.properties.id == target.id);

			targetPoints.forEach(point => {
				createPopup(point);
			});
	
			target.addEventListener('mouseout', removePopup);
		}
	}

	const mapClickHandler = (event) => {
		let target = event.target;

		target = target.closest('button');

		if (target && winWidth <= 999) {

			removePopup();

			const targetPoints = featuresArr.filter(feature => feature.properties.id == target.id);

			map.flyTo({
				center: targetPoints[0].geometry.coordinates,
				zoom: 15
				});
			
			targetPoints.forEach(point => {
				createPopup(point);
			});

			sidebar.classList.remove('active');
			document.body.style.overflow = "";
		}
	}

	map.on('load', function (e) {
		map.addControl(new mapboxgl.NavigationControl(), 'top-right');

		var features = map.queryRenderedFeatures(e.point, {
			layers: ['scenes', 'food-zone', 'tents', 'services', 'events', 'art-objects']
		  });
		
		  if (!features.length) {
			return;
		  }

		  featuresArr = features;
		  featuresArr = featuresArr.reverse();

		createSidebarItems(features);

		const itemsList = document.querySelector('.map-sidebar>ul');

		if (winWidth > 999) {
			itemsList.addEventListener('mouseover', mapMouseoverHandler);
		}
		
		itemsList.addEventListener('click', mapClickHandler);
	});

	map.on('click', function(e) {
		var features = map.queryRenderedFeatures(e.point, {
			layers: ['scenes', 'food-zone', 'tents', 'services', 'events', 'art-objects']
		});
	  
		if (!features.length) {
		  return;
		}
	  
		var feature = features[0];
	  
		createPopup(feature);
	});

	mapBtn.addEventListener('click', () => {
		sidebar.classList.toggle('active');
		document.body.style.overflow = sidebar.classList.contains('active') ? "hidden" : "";
		mapBtn.textContent = sidebar.classList.contains('active') ? "Вернуться на карту" : "Список площадок"
	});

	const footer = document.querySelector('footer');

	if (footer) {
		footer.remove();
	}
});