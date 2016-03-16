console.log('Starting app.js... ');

var config = require('./config.js');


var myapp = require('./server/server.js')(config);
myapp.init();
