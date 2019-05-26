const express = require('express');
const path = require('path');
const app = express();

// Serve
app.use(express.static(__dirname + '/dist/masterofpuppets'));
app.get('/*', function(req,res) { res.sendFile(path.join(__dirname+'/dist/masterofpuppets')); });
app.listen(process.env.PORT || 8080);
