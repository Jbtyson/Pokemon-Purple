// db.js
var mysql = require("mysql");

var Db = function(host, username, password, database) {
    var connection =  mysql.createConnection({
    	host: host,
    	user: username,
    	password: password,
      database: database
    });

    var query = function(query, params) {
      var result;
      if (!!params) {
        connection.query(query, params, function(err, row) {
          result = handleResults(err, rows);
        });
      }
      else {
        connection.query(query, function(err, rows) {
          result = handleResults(err, rows);
        });
    }

      return result;
    }

    var handleResults = function(err, rows) {
      if(err) {
        console.log(err);
        return "NULL";
      }
      else {
        return rows;
      }
    }

    return {
        connection: connection,
        query: query
    }
};
exports.Db = Db;
