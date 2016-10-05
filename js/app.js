var map;
var initMap =  function() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: new google.maps.LatLng(2.8,-187.3),
		mapTypeId: 'terrain'
	});
};

var showPictures = function(data) {
	var html = "";
	$.each(data, function(index, value) {
		console.log(index);
		console.log(value); 
		html += '<img src="' + value.photos.images.url + '"/>';
		console.log('The latitude is ' + value.photos.latitude);
		console.log('The longitude is ' + value.photos.longitude);
	});
	$('.pictures').html(html);
};

var getPhotos = function(location) {
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

$(document).ready(function() {
	$('.location-getter').submit( function(e) {
		e.preventDefault();
		$('.pictures').html('');
		var location = $(this).find("input[name='location']").val();
		getPhotos(location);
	}); 
});