function toDegrees(angleInRad){
    return angleInRad*180/Math.PI;
}

function toRadians(angleInDeg){
    return angleInDeg*Math.PI/180;
}

function wrap_valid_longitude(lon){
    // wrap a longitude value around to always have a value in the range
    //    [-180, +180) i.e 0 => 0, 1 => 1, -1 => -1, 181 => -179, -181 => 179
    // 
    return (((lon + 180.0) % 360.0) - 180.0)
}

function GpsNewPos(lat,lon,bearing,distance){
    var lat1 = toRadians(lat)
    var lon1 = toRadians(lon)
    var brng = toRadians(bearing)
    var radius_of_earth =  6378100.0    // in meters
    var dr = distance/radius_of_earth

    var lat2 = Math.asin(Math.sin(lat1)*Math.cos(dr) +
                     Math.cos(lat1)*Math.sin(dr)*Math.cos(brng))
    var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(dr)*Math.cos(lat1),
                             Math.cos(dr)-Math.sin(lat1)*Math.sin(lat2))
    return [toDegrees(lat2), wrap_valid_longitude(toDegrees(lon2))]
}

function GpsOffset(lat,lon,north,east){
    bearing = toDegrees(Math.atan2(east, north))
    distance = Math.sqrt(east**2 + north**2)
    return GpsNewPos(lat, lon, bearing, distance)

}