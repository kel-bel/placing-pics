function initMap() {
	var startingLatLng = {lat: 40.7128, lng: -73.9352};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
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
			var latitude = results[0].geometry.location.lat(); 
			var longitude = results[0].geometry.location.lng();

			//pass LatLng to the 500px API
			//var radius = "25mi";
			//var coordinates = [latitude,longitude,radius];
			getPhotosFromSource(address);
		} else {
			alert('Please write a city name. Just the city name!')
			console.log('Geocode was not successful for the following reasons: ' + status);
		}
	});
};

function getPhotosFromSource(address) {
	//console.log(coordinates);
	$('.pictures').html('');
	//parameter to get Photos from 500px API
	var params = {
		term: address,
		rpp: 20	
	};

	$.ajax({
		url: "https://api.500px.com/v1/photos/search?consumer_key=QA8nE6OeeSK4t3WKeeVa8yJr1iKlSNOl7Tw7zfL4",
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

		var locations = [value.latitude, value.longitude];

		//to add the marker to the map
		var marker = new google.maps.Marker({
			setMap: map,
			setPosition: locations
			//icon: value.image_url
		});
	});
	$('.pictures').html(html);
};

