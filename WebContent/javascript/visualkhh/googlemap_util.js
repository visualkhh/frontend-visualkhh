//<script type="text/javascript" src="https://maps.google.com/maps/api/js?v=3.exp"></script>
function GmapUtil(){};
GmapUtil.prototype = new Object();
GmapUtil.createMap=function(element,option){ //google.maps.Polyline
	return new google.maps.Map(element,option);
}
GmapUtil.fitBounds=function(map, latlgnArr){ //google.maps.Polyline
	if(latlgnArr&&latlgnArr.length>0){
		var bounds = new google.maps.LatLngBounds();
		for (var n = 0; n < latlgnArr.length ; n++){
			bounds.extend(latlgnArr[n]);
		}
		map.fitBounds(bounds);
		
		if (latlgnArr.length > 1) {
			  map.fitBounds(bounds);
		}
		else if (latlgnArr.length == 1) {
		  map.setCenter(bounds.getCenter());
		  //map.setZoom(map.getZoom()); 
		  //map.setZoom(14);
		}
		
		
	}
}
GmapUtil.fitBoundsMarkerArry=function(map, markerArr){ //google.maps.Polyline
	var bounds = new google.maps.LatLngBounds();
	for (var n = 0; n < markerArr.length ; n++){
		bounds.extend(markerArr[n].position);
	}
	map.fitBounds(bounds);
}
GmapUtil.fitPolylineBounds=function(map, polyline){ //google.maps.Polyline
	var bounds = new google.maps.LatLngBounds();
    var points = polyline.getPath().getArray();
    for (var n = 0; n < points.length ; n++){
        bounds.extend(points[n]);
    }
    map.fitBounds(bounds);
}
GmapUtil.createLatLng=function(lat,lng){//new google.maps.LatLng
	return  new google.maps.LatLng(lat, lng);;
	/*
		var p = {
				"lat":Number(lat),
				"lng":Number(lng)
		};
	 */
}

GmapUtil.addClickEvent=function(map,callback){//new google.maps.LatLng
	 google.maps.event.addListener(map, 'click',callback);//event.latLng
}
GmapUtil.createMarker=function(map,lat,lng,option){
	var obj = {
			position: {lat: lat, lng: lng},
			map: map
	}
	
	var m = new google.maps.Marker(JavaScriptUtil.extendClone(obj,option));
	
	
	
	
	return m;
}
GmapUtil.removeMarker=function(map,marker){
	if(marker)
	marker.setMap(null);
}
GmapUtil.removePolyline=function(map,polyline){
	if(polyline)
	polyline.setMap(null);
}
GmapUtil.drawPolyline=function(map,polyline){
//	var flightPlanCoordinates = new Array();
//	var p = {//var p = new google.maps.LatLng(lat, lng);
//			"lat":Number(lat),
//			"lng":Number(lng)
//	};
//	flightPlanCoordinates.push(p);
//	var flightPath = new google.maps.Polyline({
//	    path: flightPlanCoordinates,
//	    strokeColor: ColorUtil.prototype.getRandomColor(),
//	    strokeOpacity: 1.0,
//	    strokeWeight: 2
//	  });
	if(polyline && map){
		polyline.setMap(null);
		polyline.setMap(map);
	}
}
GmapUtil.move=function(map, lat,lng){
	if(map)
	map.panTo(GmapUtil.createLatLng(lat,lng));
}
GmapUtil.getZoom=function(map){
	if(map)
		return map.getZoom();
}
GmapUtil.setZoom=function(map, zoomlevel){
	if(map)
	map.setZoom(zoomlevel);
}
GmapUtil.addClickEvent=function(map, callBack){
	map.addListener('click', callBack);
//	function(event) {
//	    displayLocationElevation(event.latLng, elevator, infowindow);
//	};
}

GmapUtil.getElevation=function(location_arr,callback){ // callback(elevations, status) {elevations[i].elevation..}
	var elevator = new google.maps.ElevationService;
	  // Initiate the location request
	  elevator.getElevationForLocations({
	    'locations': location_arr
	  },callback);
	  
	  //callback
//	  function(results, status) {
//		    infowindow.setPosition(location);
//		    if (status === google.maps.ElevationStatus.OK) {
//		      // Retrieve the first result
//		      if (results[0]) {
//		        // Open the infowindow indicating the elevation at the clicked position.
//		        infowindow.setContent('The elevation at this point <br>is ' +
//		            results[0].elevation + ' meters.');
//		      } else {
//		        infowindow.setContent('No results found');
//		      }
//		    } else {
//		      infowindow.setContent('Elevation service failed due to: ' + status);
//		    }
//		  }
};
GmapUtil.getElevationPath=function(path,samplesSize,callback){ // callback(elevations, status) {elevations[i].elevation..}
	//Create an ElevationService.
	var elevator = new google.maps.ElevationService;
	// Create a PathElevationRequest object using this array.
	// Ask for 256 samples along that path.
	// Initiate the path request.
	elevator.getElevationAlongPath({
		'path': path,
		'samples': samplesSize
	}, callback);
};
GmapUtil.getElevationCallback = function(elevations, status){
	if (status !== google.maps.ElevationStatus.OK) {
		// Show the error code inside the chartDiv.
		console.log('Cannot show elevation: request failed because ' + status);
		return;
	}
	// Create a new chart in the elevation_chart DIV.
	//var chart = new google.visualization.ColumnChart(chartDiv);

	// Extract the data from which to populate the chart.
	// Because the samples are equidistant, the 'Sample'
	// column here does double duty as distance along the
	// X axis.
	//var data = new google.visualization.DataTable();
	//data.addColumn('string', 'Sample');
	//data.addColumn('number', 'Elevation');
	for (var i = 0; i < elevations.length; i++) {
		data.addRow(['', elevations[i].elevation]);
	}

	  // Draw the chart using the data within its DIV.
//	chart.draw(data, {
//		height: 150,
//		legend: 'none',
//		titleY: 'Elevation (m)'
//	});
};