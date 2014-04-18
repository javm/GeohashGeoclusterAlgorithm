var geohash = require('geohash');
var Cluster = function(center, markers){
    this.centerLatLng = center;
    //this.geohash = geohash.encodeGeoHash(this.lat, this.lng);
    this.markers = markers;
    this.size = markers.length;
};

cluster = Cluster.prototype;

//For now it jus add the cluster.markers to this markers
cluster.addCluster = function(cluster){
    this.markers = this.markers.concat(cluster.markers);
    this.size = this.size + cluster.size;
    this.centerLatLng = this.centerOf(this, cluster);
};

//Calculating center between two clusters
//center = ((lat1, lng1) * factor1 + (lat2, lng2) * factor2)/ totalFactor
cluster.centerOf = function(c1, c2){
    var lat = 0;
    var lng = 0;
    var factor1 = c1.size;
    var factor2 = c2.size;
    var totalFactor = factor1 + factor2;
    lat = ((c1.centerLatLng[0] * factor1) +  (c2.centerLatLng[0] * factor2)) / totalFactor;
    lng = ((c1.centerLatLng[1] * factor1) +  (c2.centerLatLng[1] * factor2)) / totalFactor;
    return [lat, lng];
};

module.exports = Cluster;
