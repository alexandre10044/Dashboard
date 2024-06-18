let mysql = require('mysql');
let unirest = require('unirest');
var url = require( "url" );
var queryString = require( "querystring" );

global.connection = mysql.createConnection({
    host: 'db',
    user: 'money',
    password: 'password@42',
    database: 'db'
});

global.connection.connect(function(err) {
if (err) {
    console.error('error: ' + err.message);
    return;
}
console.log('Connected to the MySQL server.');

function update() {  
    var str = "SELECT * FROM users";
        global.connection.query(str, function (err, result, fields) {
        if (err) return;
        result.forEach(function(element, index) {
            if (element.country != null && element.country != "" && element.country != "NaN") {
                var req = unirest("GET", "https://api.exchangeratesapi.io/latest?base=" + element.currency);
                req.end(function (res) {
                    if (res.error) return;
                    var tp = JSON.stringify(res.body);
                    var obj = JSON.parse(tp);
                    var money = "SELECT * FROM money WHERE currency=\"" + element.currency + "\"";
                    global.connection.query(money, function (err, res, f) {
                        var found = false;
                        var tmp;
                        if (!err) {
                            res.forEach(function(elem, index) {
                                if (elem.currency == element.currency) {
                                    found = true;
                                }
                            });
                        }
                        if (found == false) {
                            if (tp == undefined)
                                return;
                            tmp = "INSERT INTO money VALUES (NULL, '"
                            + element.currency + "', '"
                            + tp + "')";
                        } else {
                            if (tp == undefined)
                                return;
                            tmp = "UPDATE money SET rate='"
                            + tp + "' WHERE currency='" + element.currency + "'";
                        }
                        console.log("Money data updated for " + element.currency);
                        global.connection.query(tmp, function(err, rows, fields) {
                            if (err) throw err;
                        });
                    });
                });
            }
        });
        
    });
  }

  update();
setInterval(update, 5000);


});