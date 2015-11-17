// db.js
var Db = function(p_connection) {
    var connection = p_connection;

    // attempt authentication, -1 if failed
    var authenticate = function(username, password) {
      connection.query('SELECT * FROM Users',function(err,rows){
        if(err) console.log(err);

        console.log('Data received from Db:\n');
        for (var i = 0; i < rows.length; i++) {
          console.log(rows[i].name);
        };
        console.log(rows);
      });
    }

    return {
        authenticate: authenticate
    }
};
exports.Db = Db;
