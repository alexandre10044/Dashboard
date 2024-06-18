var unirest = require("unirest");
let mysql = require('mysql');
var url = require( "url" );
var queryString = require( "querystring" );

global.connection = mysql.createConnection({
    host: 'db',
    user: 'weather',
    password: 'password',
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
        if (err) throw err;
        result.forEach(function(element, index) {
            if (element.country != null && element.country != "" && element.country != "NaN") {
                var req = unirest("GET", "http://api.weatherstack.com/current?access_key=be7e6b86c175115f4a00ab91fbf4d5b0&query=" + element.country);
                req.end(function (res) {
                    if (res.error) throw new Error(res.error);
                    var tp = JSON.stringify(res.body);
                    var obj = JSON.parse(tp);

                    var weather = "SELECT * FROM weather WHERE country=\"" + element.country + "\"";
                    global.connection.query(weather, function (err, res, f) {
                        if (err) throw err;
                        var found = false;
                        var tmp;
                        res.forEach(function(elem, index) {
                            if (elem.country == element.country) {
                                found = true;
                            }
                        });
                        if (found == false) {
                            if (obj == undefined || obj.current == undefined)
                                return;
                            tmp = "INSERT INTO weather VALUES (NULL, '"
                            + element.country + "', '"
                            + obj.current.temperature + "', '"
                            + obj.current.wind_speed + "', '"
                            + obj.current.wind_dir + "', '"
                            + obj.current.precip + "', '"
                            + obj.current.humidity + "', '"
                            + obj.current.cloudcover + "', '"
                            + obj.current.weather_descriptions + "', '"
                            + obj.current.observation_time + "')";
                        } else {
                            if (obj == undefined || obj.current == undefined)
                                return;
                            tmp = "UPDATE weather SET temperature='"
                            + obj.current.temperature + "', wind_speed='"
                            + obj.current.wind_speed + "', wind_direction='"
                            + obj.current.wind_dir + "', precip='"
                            + obj.current.precip + "', humidity='"
                            + obj.current.humidity + "', cloudcover='"
                            + obj.current.cloudcover + "', description='"
                            + obj.current.weather_descriptions + "', observation_time='"
                            + obj.current.observation_time + "' WHERE country='" + element.country + "'";
                        }
                        console.log("Weather updated for " + element.country);
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