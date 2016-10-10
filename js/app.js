function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: {lat: 40.7128, lng: -73.9352}
	});

	//geocoding area, when submit it finds address lat/long
	var geocoder = new google.maps.Geocoder();

	document.getElementById('submit').addEventListener('click', function() {
			geocodeAddress(geocoder, map);
			//getPhotos(map);
	});
};

function geocodeAddress(geocoder, resultsMap) {
	var address = document.getElementById('address').value;
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			resultsMap.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: resultsMap,
				position: results[0].geometry.location
			});
			getPhotos(results);
		} else {
			alert('Geocode was not successful for the following reasons: ' + status);
		}
	});
};

function showPictures(data) {
	var html = "";
	$.each(data.photos, function(index, value) {
		console.log(index);
		console.log(value); 
		html += '<img src="' + value.image_url + '"/>';
		console.log('The latitude is ' + value.latitude);
		console.log('The longitude is ' + value.longitude);
	});
	$('.pictures').html(html);
};

function getPhotos(results) {
	console.log(results);
	$('.pictures').html('');
	var location = document.getElementById('address').value;
	console.log(location);
	//parameter to get Photos from 500px API
	var params = {
		tag: location,
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
		showPictures(data);

	});
};

//$(document).ready(function() {
//	$('.location-getter').submit( function(e) {
//		e.preventDefault();
//		$('.pictures').html('');
//		var location = $(this).find("input[name='location']").val();
//		getPhotos(location);
//	}); 
//});