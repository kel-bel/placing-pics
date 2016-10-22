function initMap() {
	var startingLatLng = {lat: 40.7531, lng: -73.9612};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: startingLatLng
	});

	//geocoding area, when submit it finds address lat/long
	var geocoder = new google.maps.Geocoder();
	document.getElementById('submit').addEventListener('click', function() {
		geocodeAddress(geocoder, map);
	

		//identifying Markers
		var keyWord = document.getElementById('address').value;
		var displayOnMap = getPhotosFromSource(keyWord);
		displayOnMap.done( function(data) {
			console.log(data);
			var html = "";
			$.each(data.photos, function(index, value) {
				//console.log(index);
				//console.log(value); 
				html += '<img src="' + value.image_url + '"/>';
				$('.pictures').html(html);
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
		getPhotos(location);
	}); 
});
