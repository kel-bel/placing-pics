var map;
var initMap =  function() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: new google.maps.LatLng(2.8,-187.3),
		mapTypeId: 'terrain'
	});
};

var getPhotos = function(location) {
	console.log(location);
	//parameter to get Photos from 500px API
	var params = {
		key: 'xHkW9aeTnoYk4k1lUYicCjbKY9VXjYOWxE3OsBt8',
		tagged: location,
		site: '500px'
	};

	$.ajax({
		url: "https://api.500px.com/v1/",
		data: params,
		dataType: "jsonp",
		type: "GET"
	})


	$.getJSON(url, params, function(data) {
		console.log(data.items);
	});
};

$(document).ready(function() {
	$('.location-getter').submit( function(e) {
		e.preventDefault();
		$('.pictures').html('');
		var location = $(this).find("input[name='location']").val();
		getPhotos(location);
	}); 
});