var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var index = require('./routes/index');
var post_message = require('./routes/post_message');
var admin = require('./routes/admin');

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.use('/post', post_message);
app.use('/admin', admin);
app.use('/', index);

app.listen(app.get('port'), function(){
    console.log("Listening to:", app.get('port'));
});