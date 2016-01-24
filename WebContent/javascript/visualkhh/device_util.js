
/*
*	@constructor visualkhh@gmail.com, twitter : @visualkhh, facebook : http://www.facebook.com/visualkhh
*/

function GPSUtil(){};
GPSUtil.prototype = new Object();
GPSUtil.getGPS=function(callback){
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	    	callback({
	    		"latitude":position.coords.latitude,
	    		"longitude":position.coords.longitude,
	    		"altitude":position.coords.altitude,
	    		"speed":position.coords.speed
	    	});
	    });
	}
};





