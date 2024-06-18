
let util = require('./util');

exports.buildMoney = function build_money_widget(pos, id, callback)
{
    var str = "SELECT * FROM money WHERE currency=\"" + global.currency + "\"";
    var content = "<div class=\"tm-col tm-col-small\">" +
    "    <div class=\"bg-white tm-block h-100\">" +
    "        <h2 class=\"tm-block-title\">Exchange Rate, Invalid user data</h2>" +
    "</div>" + "</div>";

    found = false;
    global.connection.query(str, function (err, result, fields) {
        if (err) {
            callback (content);
            return;
        } else {
            result.forEach(function(element, index) {
                var obj = JSON.parse(element.rate);
                content =
                "<div class=\"tm-col tm-col-small\">" +
                "    <div class=\"bg-white tm-block h-100\">" +
                util.BuildWidgetTopBar(pos, id) +
                "        <h2 class=\"tm-block-title\">Exchange Rate (" + global.currency + ")</h2>" +
            
                "<ol class=\"tm-list-group tm-list-group-alternate-color tm-list-group-pad-big\">";

                content += "<li class=\"tm-list-group-item\">" +
                "BGN: " + obj.rates.BGN +
                "</li>";
                content += "<li class=\"tm-list-group-item\">" +
                "RUB: " + obj.rates.RUB +
                "</li>";
                content += "<li class=\"tm-list-group-item\">" +
                "PLN: " + obj.rates.PLN +
                "</li>";
                content += "<li class=\"tm-list-group-item\">" +
                "ZAR: " + obj.rates.ZAR +
                "</li>";
                content += "<li class=\"tm-list-group-item\">" +
                "BGN: " + obj.rates.BGN +
                "</li>";
                content += "<li class=\"tm-list-group-item\">" +
                "CAD: " + obj.rates.CAD +
                "</li>";
                content += "<li class=\"tm-list-group-item\">" +
                "HUF: " + obj.rates.HUF +
                "</li>";
            
                content +=    "</ol>" +
                    "</div>" +
                    "</div>";
                callback (content);
                return;
            });
        }
    });
}