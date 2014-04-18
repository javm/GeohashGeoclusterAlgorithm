var Cluster = require('./cluster');
var Rectangle = require('./rectangle');
var geohash = require('geohash');
var Clustering = function(markers, padding, precision){
    padding = typeof padding !== 'undefined' ? padding : 0.001;
    precision = typeof precision !== 'undefined' ? precision : 6;
    this.clusters = {};
    var that = this;

    //Cluster initial building from the markers
    Object.keys(markers).forEach(function(key){
	var markerData = markers[key];
	var markerHash = geohash.encodeGeoHash(markerData['lat'], markerData['lng']);
	var geohashKey = markerHash.substr(0,precision);
	if (that.clusters[geohashKey]){
	    var simpleCluster = new Cluster([markerData['lat'], markerData['lng']], [markerData]);
	    that.clusters[geohashKey].addCluster(simpleCluster);
	}else{
	    that.clusters[geohashKey] = new Cluster([markerData['lat'], markerData['lng']], [markerData]);
	}
    });

    var latitudes = [];
    var longitudes = [];
    for(hash in this.clusters){
	//console.log(that.clusters[hash]);
	latitudes.push(that.clusters[hash]["centerLatLng"][0]);
	longitudes.push(that.clusters[hash]["centerLatLng"][1]);
    }
    //console.log(latitudes);
    var latArr = latitudes.sort();
    var lngArr = longitudes.sort();
    var latFirst = latArr.shift();
    var latLast = latArr.pop();
    var lngFirst = lngArr.shift();
    var lngLast = lngArr.pop();

    var p1 = [lngFirst - padding, latFirst - padding];
    var p2 = [lngLast + padding, latLast + padding];
    this.bbox = new Rectangle(p1,p2);
    //console.log(this.bbox);
    var mp = this.bbox.middle_point();
    this.centerLatLng = [mp[1], mp[0]];
};
var clustering = Clustering.prototype;
module.exports = Clustering;
