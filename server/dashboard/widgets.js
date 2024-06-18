var util = require('./util');
global.error = "";

exports.addWidget = function addWidgetProcess(req, resp)
{
    var query_string = require('querystring');
    var page_content;
    var page;
 
     if (req.method == 'POST') {
        var req_body = '';
         req.on('data', function (data) {
             req_body += data;
             if (req_body.length > 1e6)
                 req.connection.destroy();
         });
         req.on('end', function () {
             var post_data = query_string.parse(req_body);
             var widget_id = post_data["category"];
             var refresh = post_data["refresh"];
            if (widget_id !== null && widget_id !== "" && widget_id !== "Select one" && isNaN(refresh) === false) {
                if (global.dashboard === null || global.dashboard === "" || global.dashboard === null) {
                    global.dashboard = post_data["category"] + ";" + post_data["refresh"] + ";";
                } else {
                    global.dashboard += post_data["category"] + ";" + post_data["refresh"] + ";";
                }
                global.connection.query("UPDATE users SET dashboard=\"" + global.dashboard  + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
                });
            } else {
                global.error = "Invalid syntax";
            }
             resp.writeHead(302, {
                 'Location': 'dashboard'
             });
             resp.end(page)
         });
     }
}

exports.showWidgetsPage = function buildWidgetsPage(req, resp, error_message) {
    var content =
    "<div class=\"row tm-content-row tm-mt-big\">" +
    "<div class=\"col-xl-8 col-lg-12 tm-md-12 tm-sm-12 tm-col\">" +
    "    <div class=\"bg-white tm-block h-100\">" +
    "        <div class=\"row\">" +
    "            <div class=\"col-md-8 col-sm-12\">" +
    "<h2 class=\"tm-block-title d-inline-block\">Installed Widgets</h2>" +

    "            </div>" +
    "        </div>" +
    "        <div class=\"table-responsive\">" +
    "            <table class=\"table table-hover table-striped tm-table-striped-even mt-3\">" +
    "<thead>" +
    "    <tr class=\"tm-bg-gray\">" +
    "        <th scope=\"col\">Widget Name</th>" +
    "        <th scope=\"col\">Service Name</th>" +
    "        <th scope=\"col\">Description</th>" +
    "        <th scope=\"col\">Install Date</th>" +
    "    </tr>" +
    "</thead>" +
    "<tbody>";

    
    if (global.services == null || global.services == "") {
        content += "</tbody>" +
        "            </table>" +
        "        </div>" +
        "    </div>" +
        "</div>" +
                "</div>";
        var data = util.buildPage("Services Page", content);
        resp.writeHead(200, {'Content-Type':'text/html'});
        resp.end(data);
        return;
    }

    var arr = global.services.split(";").map(function (val) { return +val; });

    var str = "SELECT * FROM services";
    global.connection.query(str, function (err, result, fields) {

    global.connection.query("SELECT * FROM widgets", function (err, widgets, fields) {
        widgets.forEach(function(widg, w) {
            result.forEach(function(serv, i) {
                arr.forEach(function(elem, e) {
                    if (elem == serv.id && serv.widgets !== null) {
                        var widgs = serv.widgets.split(";").map(function (val) { return +val; });
                        widgs.forEach(function(tmp, t) {
                            if (tmp == widg.id) {
                                var dateFormat = require('dateformat');
                                var day=dateFormat(new Date(), "yyyy-mm-dd");
                                content +=
                                "    <tr>" +
                                "        <td class=\"tm-product-name\">" + widg.name + "</td>" +
                                "        <td>" + serv.name + "</td>" +
                                "        <td>" + widg.description + "</td>" +
                                "        <td>" + day + "</td>" +
                                "    </tr>";
                            }
                        });
                    }
                });
            });
        });
        content += "</tbody>" +
        "            </table>" +
        "        </div>" +
        "    </div>" +
        "</div>" +
                "</div>";
        var data = util.buildPage("Services Page", content);
        resp.writeHead(200, {'Content-Type':'text/html'});
        resp.end(data);
    });
});
}