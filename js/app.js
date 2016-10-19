function initMap() {
	var startingLatLng = {lat: 40.7128, lng: -73.9352};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: startingLatLng
	});

	//geocoding area, when submit it finds address lat/long
	var geocoder = new google.maps.Geocoder();
	document.getElementById('submit').addEventListener('click', function() {
		geocodeAddress(geocoder, map);
	});

	//identifying Markers
	var keyWord = document.getElementById('address').value;
	var displayOnMap = getPhotosFromSource(keyWord);
	console.log(displayOnMap);
	displayOnMap.done( function(data) {
		console.log(data);
		var html = "";
		$.each(data.photos, function(index, value) {
			//console.log(index);
			//console.log(value); 
			//html += '<img src="' + value.image_url + '"/>';
			//$('.pictures').html(html);
			//Grabbing lat and long of pictures
			Lat = value.latitude;
			Lng = value.longitude;

			var eachPic = value.image_url;
			console.log(eachPic);
			var latlng = new google.maps.LatLng(Lat, Lng);
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				icon: eachPic
			});
		});
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
		} else {
			alert('Please write a city name. Just the city name!')
			console.log('Geocode was not successful for the following reasons: ' + status);
		}
	});
};

function getPhotosFromSource(keyWord) {
	var Lat;
	var Lng;
	//parameter to get Photos from 500px API
	var params = {
		term: keyWord,
		rpp: 20	
	};

	var promise = $.ajax({
		url: "https://api.500px.com/v1/photos/search?consumer_key=QA8nE6OeeSK4t3WKeeVa8yJr1iKlSNOl7Tw7zfL4",
		data: params,
		dataType: "json",
		type: "GET",
	});

	return promise.done(function(data) {
		return data.photos;
	});

//	.done( function(data) {
//		console.log(data);
		//show the pics from 500px 
//		var html = "";
//		$.each(data.photos, function(index, value) {
//			//console.log(index);
			//console.log(value); 
//			html += '<img src="' + value.image_url + '"/>';
//			//console.log('Latitude: ' + value.latitude + 'Longitude: ' + value.longitude);

//			$('.pictures').html(html);
			//Grabbing lat and long of pictures
//			Lat = 40.71;
//			Lng = -73.9;
			//return [Lat, Lng];
//		});
//		console.log(Lat);
//	});
};




