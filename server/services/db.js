// db.js
var mysql = require("mysql");

var Db = function(host, username, password, database) {
    var connection =  mysql.createConnection({
    	host: host,
    	user: username,
    	password: password,
      database: database
    });

    var query = function(query) {
      var result;
      connection.query(query, function(err, rows) {
        if(err) {
          console.log(err);
          result = "NULL";
        }
        else {
          result = rows;
        }
      });

      return result;
    }

    return {
        connection: connection,
        query: query
    }
};
exports.Db = Db;
