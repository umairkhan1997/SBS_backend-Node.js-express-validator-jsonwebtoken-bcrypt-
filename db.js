var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'password@123',
    database : 'Sbs-schema'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
    console.log('database connected')
});

connection.on('error', function(err) {
    console.log("[mysql error]",err);
  });

module.exports = connection;