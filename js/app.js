function initMap() {
	var startingLatLng = {lat: 40.7128, lng: -73.9352};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: startingLatLng
	});

	//geocoding area, when submit it finds address lat/long
	var geocoder = new google.maps.Geocoder();

	document.getElementById('submit').addEventListener('click', function() {
		geocodeAddress(geocoder, map);
	
		//Identifying the given Lat and Longitude the map starts with	
		console.log(startingLatLng);
	});
};

function geocodeAddress(geocoder, resultsMap) {
	var address = document.getElementById('address').value;
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			console.log(results[0].geometry.location);
			resultsMap.setCenter(results[0].geometry.location);
			getPhotosFromSource(address, resultsMap);
		} else {
			alert('Please write a city name. Just the city name!')
			console.log('Geocode was not successful for the following reasons: ' + status);
		}
	});
};

function getPhotosFromSource(address, resultsMap) {
	console.log(address);
	console.log(resultsMap);
	$('.pictures').html('');
	//parameter to get Photos from 500px API
	var params = {
		tag: address,
		part: 'photos'	
	};

	$.ajax({
		url: "https://api.500px.com/v1/photos/search?consumer_key=jbENq5GFQfuSSut8cQQSbRH6sRjNoxVehMwJZIwp",
		data: params,
		dataType: "json",
		type: "GET",
	})

	.done( function(data) {
		console.log(data);
		//show the pics from 500px 
		setPictures(data);

	});
};

function setPictures(data) {
	var html = "";
	$.each(data.photos, function(index, value) {
		console.log(index);
		console.log(value); 
		html += '<img src="' + value.image_url + '"/>';
		console.log('Latitude: ' + value.latitude + 'Longitude: ' + value.longitude);
		
		//add markers to each location on map
		var marker = new google.maps.Marker({
			map: map,
			position: value.latitude + value.longitude,
			icon: value.image_url
		});

		//to add the marker to the map, you must call setMap?
		marker.setMap(map);
	});
	$('.pictures').html(html);

	
	
};

