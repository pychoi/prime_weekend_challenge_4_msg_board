var express = require('express');
var router = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/message_board';

router.get('/data', function(req,res){
    var results = [];

    pg.connect(connectionString, function (err, client) {
        var query = client.query("SELECT * FROM messages ORDER BY id ASC");

        // Stream results back one row at a time, push into results array
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

router.post('/data', function(req, res){

    var addedMessage = {
        "name": req.body.name,
        "message": req.body.message
    };

    pg.connect(connectionString, function(err, client){
       client.query("INSERT INTO messages (name, message) VALUES ($1, $2)",
           [addedMessage.name, addedMessage.message],
           function (err, result) {
               if (err) {
                   console.log("Error inserting data: ", err);
                   res.send(false);
               }
               res.send(true);
           });
    });

});

module.exports = router;
