var util = require('./util');

exports.buildServicesInfos = function ServicesInfos() {
    var arr = global.services.split(";").map(val => Number(val) + 1);
    // var str = "SELECT * FROM users where username = '" + username + "'";
    // if (openDb() == false)
    //     return (null);
    // connection.query(str, function (err, result, fields) {
    //     var found = false;
    //     if (err) return (false);
    //     result.forEach(function(element, index) {
    //         if (element.password.localeCompare(password) == 0 && element.username.localeCompare(username) == 0) {
    //             resp.writeHead(200, {'Content-Type':'text/html'});
    //             page = util.buildPage("Login success", util.pageMenu(), "<font color=red>Login success.</font>");
    //             global.username = username;
    //             global.password = password;
    //             global.mail = element.mail;
    //             resp.writeHead(302, {
    //                 'Location': 'dashboard'
    //             });
    //             resp.end(page)
    //             found = true;
    //             return (true);
    //         }
    //     });
    //     if (found !== true) {
    //         req.user_name = username;
    //         req.password = password;
    //         login.buildLoginPage(req, resp, 'Please, check username or password.')
    //     }
    // });
}

exports.showServicesPage = function buildServicesPage(req, resp, error_message) {
    var str = "SELECT * FROM services";
    global.connection.query(str, function (err, result, fields) {
        var content = buildServices(result) + buildNewServices(result);
        if (err) return (false);
        var data = util.buildPage("Services Page", content);
        resp.writeHead(200, {'Content-Type':'text/html'});
        resp.end(data);
    });
}

exports.deleteServicePage = function deleteServices(req, resp, error_message)
{
    var query_string = require('querystring');

    if (req.method == 'POST') {
        var req_body = '';
         req.on('data', function (data) {
             req_body += data;
             if (req_body.length > 1e6)
                 req.connection.destroy();
         });
         req.on('end', function () {
             var post_data = query_string.parse(req_body);
             if (post_data["service_id"] !== "" && post_data["service_id"] !== 0) {
                global.services = global.services.replace(post_data["service_id"] + ";", "");
                global.connection.query("UPDATE users SET services=\"" + global.services + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
                });
             }
         });
     }
    resp.writeHead(302, {
        'Location': 'services'
    });
    resp.end(page)
}

exports.newServicePage = function installNewServices(req, resp, error_message)
{
    var query_string = require('querystring');

    if (req.method == 'POST') {
        var req_body = '';
         req.on('data', function (data) {
             req_body += data;
             if (req_body.length > 1e6)
                 req.connection.destroy();
         });
         req.on('end', function () {
             var post_data = query_string.parse(req_body);
             if (post_data["category"] !== "" && post_data["category"] !== "Select one") {
                if (global.services == null || global.services == "null") {
                    global.services = post_data["category"] + ";";
                } else {
                    global.services += post_data["category"] + ";";
                }
                global.connection.query("UPDATE users SET services=\"" + global.services + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
                });
             }
         });
     }
    resp.writeHead(302, {
        'Location': 'services'
    });
    resp.end(page)
}

function buildServices(result)
{
    var val = "<div class=\"row tm-content-row tm-mt-big\">" +
        "<div class=\"col-xl-8 col-lg-12 tm-md-12 tm-sm-12 tm-col\">" +
        "    <div class=\"bg-white tm-block h-100\">" +
        "        <div class=\"row\">" +
        "            <div class=\"col-md-8 col-sm-12\">" +
        "<h2 class=\"tm-block-title d-inline-block\">Services</h2>" +
    
        "            </div>" +
        "        </div>" +
        "        <div class=\"table-responsive\">" +
        "            <table class=\"table table-hover table-striped tm-table-striped-even mt-3\">" +
        "<thead>" +
        "    <tr class=\"tm-bg-gray\">" +
        "        <th scope=\"col\">Service Name</th>" +
        "        <th scope=\"col\">Description</th>" +
        "        <th scope=\"col\">&nbsp;</th>" +
        "    </tr>" +
        "</thead>" +
        "<tbody>";

        if (global.services !== null && global.services !== "") {
            var arr = global.services.split(";").map(function (val) { return +val; });

            result.forEach(function(serv, i) {
                arr.forEach(function(elem, e) {
                    if (elem == serv.id) {
                        val += "    <tr>" +
                        "        <td class=\"tm-product-name\">" + serv.name + "</td>" +
                        "        <td>" + serv.description + "</td>" +
                        "<form method=\"POST\" action=\"remove_service\">" +
                        "<input type=\"hidden\" name=\"service_id\" value=\"" + serv.id + "\">" +
                        "        <td><button type=\"submit\" class=\"fas fa-trash-alt tm-trash-icon\"></button></td>" +
                        "</form>" +
                        "    </tr>";
                    }
                });
            });
        }

        val += "</tbody>" +
        "            </table>" +
        "        </div>" +
        "    </div>" +
        "</div>";
        return (val);
}

function buildNewServices(result)
{
    var val = "<div class=\"col-xl-4 col-lg-12 tm-md-12 tm-sm-12 tm-col\">" +
    "    <div class=\"bg-white tm-block h-100\">" +
    "        <h2 class=\"tm-block-title d-inline-block\">New Service</h2>" +
    "        <form action=\"new_service\" method='post' class=\"tm-edit-product-form\">" +
    "            <div class=\"input-group mb-3\">" +
    "                <label for=\"category\" class=\"col-xl-4 col-lg-4 col-md-4 col-sm-5 col-form-label\">Service List</label>" +
    "                <select class=\"custom-select col-xl-9 col-lg-8 col-md-8 col-sm-7\" name=\"category\" id=\"category\">" +
    "                    <option selected>Select one</option>";

    if (global.services !== null && global.services !== "") {
        var index = 1;
        var arr = global.services.split(";").map(function (val) { return +val; });

        result.forEach(function(serv, i) {
            var found = false;
            arr.forEach(function(elem, e) {
                if (elem == serv.id) {
                    found = true;
                }
            });
            if (found == false) {
                val += "                    <option value=\"" + serv.id + "\">" + serv.name + "</option>";
                index++;
            }
        });
    } else {
        result.forEach(function(serv, i) {
            val += "                    <option value=\"" + serv.id + "\">" + serv.name + "</option>";
            index++;
        });
    }

    val += "                </select>" +
    "            </div>" +
    "            <div class=\"input-group mb-3\">" +
    "                <div class=\"ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0\">" +
    "                    <button type=\"submit\" class=\"btn btn-primary\">Install New Service" +
    "                    </button>" +
    "                </div>" +
    "            </div>" +
    "        </form>" +
    "    </div>" +
    "</div></div>";

    return (val);
}