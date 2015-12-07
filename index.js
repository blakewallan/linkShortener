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
    db.link.findAll().then(function(links){
        res.render('index', {links : links});
    });
    //res.render('index');
});

app.post('/', function(req, res){
    var newLink = {
        original : req.body.og,
        new : numConvert(req.body.og),
        clicks : 0
    };
    db.link.create(newLink).then(function(){
        res.render('show', {links : newLink});
    });
});

app.get('/:id', function(req, res){
    var index = req.params.id;
    db.link.findAll({
        where : {
            new : "localhost:3000/" + String(index)
        }
    }).then(function(links){
        res.redirect(links[0].dataValues.original);
    });
});

//Convert link to hash id
var numConvert = function(link){
    var converted = "";
    for(var i = 0; i < link.length; i ++){
        converted += link.charCodeAt(i);
    }
    return ("localhost:3000/" + String(hashids.encode(parseInt(converted))));
}

app.listen(3000);
