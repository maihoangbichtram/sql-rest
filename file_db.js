var sqlite3 = require('sqlite3').verbose();
const path = require('path');
var db;
var db_name;

var express = require('express');
var restapi = express();
var router = express.Router();
var https = require('http');

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
		db_name = req.params.db;
		res.send('Current database: ' + req.params.db + ".db");
	} else 
		db = '';
});

restapi.get('/db', function(req, res){
	res.send('Current database: ' + db_name);
});

restapi.get('/query/:query', function(req, res) {
	db.all(req.params.query, function(err, row){
        res.json({ row });
    });
});

restapi.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

restapi.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})

console.log("Submit GET or POST to http://localhost:3000/data");
