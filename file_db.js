var sqlite3 = require('sqlite3').verbose();
const path = require('path');
//const dbPath = path.resolve(__dirname, 'Library.db')
//dbPath = path.resolve(__dirname, 'Library.db')
//var Library = new sqlite3.Database(dbPath);
//dbPath = path.resolve(__dirname, 'Chinook.db')
//var Chinook = new sqlite3.Database(dbPath);
var db;

/*db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS counts (key TEXT, value INTEGER)");
    db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
});*/



var express = require('express');
var restapi = express();
var router = express.Router();
var https = require('https');
//var fs = require('fs');





restapi.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	//res.status(404).send({url: req.originalUrl + ' not found'})
    next();
});


restapi.use('/api', router);

restapi.get('/db/:db', function(req, res){
	if(req.params.db != 'null') {
		const dbPath = path.resolve(__dirname, req.params.db + '.db');
		db = new sqlite3.Database(dbPath);
		res.send('Current database: ' + req.params.db + ".db");
	} else 
		db = '';
});

/*restapi.get('/Library/:query', function(req, res){
    Library.all(req.params.query, function(err, row){
        res.json({ row });
    });
});

restapi.get('/Chinook/:query', function(req, res){
    Chinook.all(req.params.query, function(err, row){
        res.json({ row });
    });
});*/

restapi.get('/query/:query', function(req, res) {
	db.all(req.params.query, function(err, row){
        res.json({ row });
    });
});

restapi.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

/*https.createServer(options,function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(3000);*/

restapi.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})

/*const httpsOptions = {
	key: fs.readFileSync('./server.key'),
	cert: fs.readFileSync('./server.crt'),
	passphrase: 'abcmhbt123',
	requrestCert: false,
	rejectUnauthorized: false
};

const server = https.createServer(httpsOptions, restapi).listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})*/

console.log("Submit GET or POST to http://localhost:3000/data");

/*db.serialize(function() {
    db.each("SELECT ID FROM patron", function(err, row) {
		//console.log(err);
        console.log(row.ID);
    });
});*/