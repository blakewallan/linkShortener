var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var Hashids = require('hashids'),
    hashids = new Hashids('this is my salt');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

//Render home
app.get('/', function(req, res){
    res.render('index');
});



//Convert link to hash id
var numConvert = function(link){
    var converted = "localhost:3000/";
    for(var i = 0; i < link.length; i ++){
        converted += link.charCodeAt(i);
    }
    return hashids.encode(parseInt(converted));
}

console.log(numConvert("alsjdflajfdlasasdfasfads"));


app.listen(3000);
