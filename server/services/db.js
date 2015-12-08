// db.js
var mysql = require("mysql");

var Db = function(host, username, password, database) {
    var connection =  mysql.createConnection({
    	host: host,
    	user: username,
    	password: password,
      database: database
    });

    var query = function(query, params, callback) {
      var result;
      if (!!params) {
        connection.query(query, params, function(err, row) {
          result = handleResults(err, rows);
          if(err) {
            console.log(err);
            callback("NULL");
          }
          else {
            callback(result);
          }
        });
      }
      else {
        connection.query(query, function(err, rows) {
          if(err) {
            console.log(err);
            callback("NULL");
          }
          else {
            callback(result);
          }
          callback(result);
        });
      }
    }

    return {
        connection: connection,
        query: query
    }
};
exports.Db = Db;
