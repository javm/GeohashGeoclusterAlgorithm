var Clustering = require('./models/clustering');
var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.json({"title": "Clustering Markers"});
});

app.get('/clusters', function(req, res){
    var markers = require('./markers.json');
    var clustering = new Clustering(markers["markers"]);
    var obj = {"clusters": clustering.clusters,
	       "centerLatLng": clustering.centerLatLng};

    //console.log(req);
    if(req.query.callback){
	//console.log(req.query.callback);
	//res.jsonp(req.query.callback+"("+JSON.stringify(clustering)+")");
	res.jsonp(obj);
    }else{
	res.json(obj);
    }
});

app.listen(3000);
