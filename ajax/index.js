// var clientID = '41442292c26bbb504154aa465ecb1cf0'
	
// var clientSecret = '702ca8c8db4e35bff0df48e4aefbcf1e'

var appid = "dj0yJmk9RUdLVHVlRkExRUNSJmQ9WVdrOWNHdHVjbU5pTnpBbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD04Ng--"

// var url = 'http://amee.com/3.6/categories/Great_Circle_flight_methodology/calculation'

// var vaule= $(this).val()


// console.log(city)



var urlPollen = "https://pollencheck.p.mashape.com/api/1/forecasts"


var data = {
	appid: appid,
	// name:'Portland',
	// username: clientID,
	// password: clientSecret,
	// from_lat_lon: '51.623,-0.0732',
	// distance: '20',

	// type:'great circle route',
	// 'values.IATAcode1':'LHR',
	// 'values.IATAcode2':'LAX',
	format:'json'
};


// var pollenData = {
// 	woeid:data.places.place[0].woeid,
// 	'X-Mashape-Key': "ePWZE3ku7Amsh2ng1pWg2hdp7V0kp1RkktxjsnJrrsMv8rQm22",
// 	format: 'json'
// }

function go() {
	$.ajax("http://where.yahooapis.com/v1/places.q("+$('#city').val()+")" , { data: data, dataType: 'jsonp' })
	 .fail(displayVenues).then(displayVenues)
	}

	




// $.ajax(urlPollen, data: {woeid:data.places.place[0].woeid,format: 'json'}, dataType:'jsonp',
// 	beforeSend: function(xhr) {
// 	xhr.setRequestHeader("X-Mashape-Authorization", "ePWZE3ku7Amsh2ng1pWg2hdp7V0kp1RkktxjsnJrrsMv8rQm22")}))
// }


function displayVenues(data,status,xhr) {
	console.log(data);
	console.log(status);
	console.log(xhr);
	var worldID= data.places.place[0].woeid
	var pollen= $('#pollenType').val();
	$.ajax({
    url: "https://pollencheck.p.mashape.com/api/1/forecasts/"+worldID, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method
    data: {format: 'json'}, // Additional parameters here
    datatype: 'json',
    success: function(data) { $('#text').append("    Average count of pollen grains from "+pollen+" in "+$('#city').val()+" for today:  "+data.periods[3][pollen].avgCounter+'<br>'); },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "ePWZE3ku7Amsh2ng1pWg2hdp7V0kp1RkktxjsnJrrsMv8rQm22"); // Enter here your Mashape key
    }
});

	
}

$(function(){
	// var value = $(this).val()
	var pollen= $('#pollenType').val();
	var city= $('#city').val()
	$('#go').click(go)
})







