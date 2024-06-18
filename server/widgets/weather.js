let util = require('./util');

exports.buildWeather = function build_weather_widget(pos, id, callback)
{
    var str = "SELECT * FROM weather WHERE country=\"" + global.country + "\"";
    var content = "<div class=\"tm-col tm-col-small\">" +
    "    <div class=\"bg-white tm-block h-100\">" +
    "        <h2 class=\"tm-block-title\">Weather, Invalid user data</h2>" +
    "</div>" + "</div>";
    found = false;
    global.connection.query(str, function (err, result, fields) {
        if (err) {
            callback (content);
            return;
        } else {
            result.forEach(function(element, index) {
                content = 
                "<div class=\"tm-col tm-col-small\">" +
                "    <div class=\"bg-white tm-block h-100\">" +
                    util.BuildWidgetTopBar(pos, id) +
                "        <h2 class=\"tm-block-title\">Whats the weather today ?</h2>" +
                "        <ol class=\"tm-list-group\">" +
                "            <label class=\"tm-list-group-item\">In your city " + global.country + ",</label>" +
                "            <label class=\"tm-list-group-item\">The temperature is " + element.temperature + " Celsius</label>" +
                "            <label class=\"tm-list-group-item\">The weather description is " + element.description + "</label>" +
                "            <label class=\"tm-list-group-item\">The wind speed is " + element.wind_speed + " (" + element.wind_direction + ")</label>" +
                "            <label class=\"tm-list-group-item\">Precipitation " + element.precip + "%</label>" +
                "            <label class=\"tm-list-group-item\">Humidity " + element.humidity + "%</label>" +
                "            <label class=\"tm-list-group-item\">Cloud Cover " + element.cloudcover + "%</label>" +
                "        </ol>" +
                "    </div>" +
                "</div>";
                callback (content);
                return;
            });
        }
    });
}