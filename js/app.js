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
		tag: location
	};

	$.ajax({
		url: "https://api.500px.com/v1/photos/search?consumer_key=jbENq5GFQfuSSut8cQQSbRH6sRjNoxVehMwJZIwp",
		data: params,
		type: "GET"
	});


	$.getJSON(url, params, function(data) {
		console.log(data);
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