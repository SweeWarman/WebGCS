var mymap = L.map('mapid',{
    contextmenu: true,
    contextmenuItems:[{
        text: "New waypoint",
        callback: AddNewWaypoint
    },
    
    {
        text: "Construct fence",
        callback: AddGeofence
    }
]}).setView([51.505, -0.09], 13);

var flightplan = []
var waypointIndex = 0;
var flightplanLine = null;
var geofenceList = []
var currentFence = []

function Waypoint(index,latlng,marker){
    this.index = index;
    this.latlng = latlng;
    this.marker = marker;
    this.clicked = false;
}

function AddNewWaypoint(e){
    var marker = L.marker(e.latlng,{
        contextmenu: true,
        contextmenuItems: [{
            text: 'remove',
            callback: RemoveWaypoint
        }, {
            text: 'move',
        }],
        contextmenuInheritItems: false
    }).addTo(mymap);
    marker.bindPopup(String(e.latlng.lat.toFixed(4))+','+String(e.latlng.lng.toFixed(4)));
    wp = new Waypoint(waypointIndex,[e.latlng.lat,e.latlng.lng],marker);
    flightplan.push(wp);
    waypointIndex++;
    if( waypointIndex > 1){
        modalFpLength++;
    }

    DrawFlightPlan();
}

function DrawFlightPlan(){
    if(flightplanLine != null){
        flightplanLine.remove();
    }
    var polyLineVertices = [];
    flightplan.forEach(function(element){
        polyLineVertices.push(element.latlng);
    });
     
    if (polyLineVertices.length > 1){
        flightplanLine = L.polyline(polyLineVertices,{color:'red'}).addTo(mymap);
    }
}

function RemoveWaypoint(e){
    var index2remove = 0
    for(i=0;i<flightplan.length;++i){
        element = flightplan[i];
        if(element.marker.isPopupOpen() == true){
            element.marker.remove();
			$('.data-entry-wp'+String(i)).remove();
            break;
        }
        index2remove++;
    }
    flightplan.splice(index2remove,1);
    modalFpLength--;
    if(modalFpLength == 0){
        modalFpLength = 1;
    }

    DrawFlightPlan();
}

function AddGeofence(e){
    
}

function ConstructFence(e){

}

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.satellite'
}).addTo(mymap);

var acIcon = L.icon({
    iconUrl: 'quadcopter.png',
    shadowUrl: '',

    iconSize:     [38, 38], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

acMarkerPos = L.latLng(51.51,-0.09123)
var acMarker = L.marker(acMarkerPos, {icon: acIcon}).addTo(mymap)

