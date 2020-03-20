var util = require('./util');
var weather = require('../widgets/weather');
var map = require('../widgets/map');
var money = require('../widgets/money');
var discord = require('../widgets/discord');
var minecraft = require('../widgets/minecraft');
var news = require('../widgets/news');
var crypto = require('../widgets/crypto');
var soundcloud = require('../widgets/soundcloud');
var content = "";

exports.showLeftBoardPage = function left_dashboard(req, resp)
{
    var query_string = require('querystring');
    var page_content;
    var page;

    var arr = global.dashboard.split(";").map(function (val) { return +val; });

    if (req.method == 'POST') {
       var req_body = '';
        req.on('data', function (data) {
            req_body += data;
            if (req_body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            var post_data = query_string.parse(req_body);
            var widg_id = post_data["widget_id"];
            var widg_pos = post_data["widget_pos"];
            var tmp = false;
            var newValue = "";
            var t = "";
            
            if (widg_pos == 1) {
                arr.forEach(function(elem, e) {
                    if (tmp === false) {
                        if (e == 0) {
                            if (elem == 0)
                                t += ";";
                            else
                                t += elem + ";";
                        } else {
                            if (elem == 0)
                                newValue += ";";
                            else
                                newValue += elem + ";";
                        }
                        tmp = true;
                    } else {
                        if (e !== 1) {
                            if (elem == 0) {
                                newValue += ";";
                            } else
                                newValue += elem + ";";
                        } else {
                            if (elem == 0) {
                                t += ";";
                            } else
                                t += elem + ";";
                        }
                        tmp = false;
                    }
                });
            } else {
                arr.forEach(function(elem, e) {
                    if (tmp === false) {
                        if (e === ((widg_pos - 1) * 2) - 2) {
                            var t1 = JSON.parse(JSON.stringify(arr[e]));
                            var u1 = JSON.parse(JSON.stringify(arr[e + 2]));
                            arr[e] = u1
                            elem = u1;
                            arr[e + 2] = t1;
                            var t2 = JSON.parse(JSON.stringify(arr[e + 1]));
                            var u2 = JSON.parse(JSON.stringify(arr[e + 3]));
                            arr[e + 1] = u2;
                            arr[e + 3] = t2;
                        }
                        if (elem == 0)
                            newValue += ";";
                        else
                            newValue += elem + ";";
                        tmp = true;
                    } else {
                        if (elem == 0) {
                            newValue += ";";
                        } else
                            newValue += elem + ";";
                        tmp = false;
                    }
                });
            }
            if (newValue.length)
                newValue = newValue.substring(0, newValue.length - 1);
            if (t !== "") {
                newValue += t;
            }
            global.dashboard = newValue;
            global.connection.query("UPDATE users SET dashboard=\"" + global.dashboard  + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
            });
            resp.writeHead(302, {
                'Location': 'dashboard'
            });
            resp.end(page)
        });
    }
}

exports.showRightBoardPage = function right_dashboard(req, resp)
{
    var query_string = require('querystring');
    var page_content;
    var page;

    var arr = global.dashboard.split(";").map(function (val) { return +val; });

    if (req.method == 'POST') {
       var req_body = '';
        req.on('data', function (data) {
            req_body += data;
            if (req_body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            var post_data = query_string.parse(req_body);
            var widg_id = post_data["widget_id"];
            var widg_pos = post_data["widget_pos"];
            var tmp = false;
            var newValue = "";
            var t = "";
            
            if (widg_pos == (arr.length - 1) / 2) {
                arr.forEach(function(elem, e) {
                    if (tmp === false) {
                        if (e == arr.length - 3) {
                            if (elem == 0)
                                t += ";";
                            else
                                t += elem + ";";
                        } else {
                            if (elem == 0)
                                newValue += ";";
                            else
                                newValue += elem + ";";
                        }
                        tmp = true;
                    } else {
                        if (e == arr.length - 2) {
                            if (elem == 0) {
                                t += ";";
                            } else
                                t += elem + ";";
                        } else {
                            if (elem == 0) {
                                newValue += ";";
                            } else
                                newValue += elem + ";";
                        }
                        tmp = false;
                    }
                });
            } else {
                arr.forEach(function(elem, e) {
                    if (tmp === false) {
                        if (e === ((widg_pos - 1) * 2)) {
                            var t1 = JSON.parse(JSON.stringify(arr[e]));
                            var u1 = JSON.parse(JSON.stringify(arr[e + 2]));
                            arr[e] = u1
                            elem = u1;
                            arr[e + 2] = t1;
                            var t2 = JSON.parse(JSON.stringify(arr[e + 1]));
                            var u2 = JSON.parse(JSON.stringify(arr[e + 3]));
                            arr[e + 1] = u2;
                            arr[e + 3] = t2;
                        }
                        if (elem == 0)
                            newValue += ";";
                        else
                            newValue += elem + ";";
                        tmp = true;
                    } else {
                        if (elem == 0) {
                            newValue += ";";
                        } else
                            newValue += elem + ";";
                        tmp = false;
                    }
                });
            }
            if (newValue.length)
                newValue = newValue.substring(0, newValue.length - 1);
            if (t !== "") {
                newValue = t + newValue;
            }
            global.dashboard = newValue;
            global.connection.query("UPDATE users SET dashboard=\"" + global.dashboard  + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
            });
            resp.writeHead(302, {
                'Location': 'dashboard'
            });
            resp.end(page)
        });
    }
}

exports.showRemoveBoardPage = function remove_dashboard(req, resp)
{
    var query_string = require('querystring');
    var page_content;
    var page;
        
    var newValue = "";

    var arr = global.dashboard.split(";").map(function (val) { return +val; });

    if (req.method == 'POST') {
       var req_body = '';
        req.on('data', function (data) {
            req_body += data;
            if (req_body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            var post_data = query_string.parse(req_body);
            var widg_id = post_data["widget_id"];
            var widg_pos = post_data["widget_pos"];
            var tmp = false;
            
            arr.forEach(function(elem, e) {
                if (tmp === false) {
                    if (e == (widg_pos - 1) * 2) {
                    } else {
                        if (elem == 0)
                            newValue += ";";
                        else
                            newValue += elem + ";";
                    }
                    tmp = true;
                } else {
                    if (e !== ((widg_pos - 1) * 2) + 1) {
                        if (elem == 0)
                            newValue += ";";
                        else
                            newValue += elem + ";";
                    }
                    tmp = false;
                }
            });
            if (newValue.length)
                newValue = newValue.substring(0, newValue.length - 1);
            global.dashboard = newValue;
            global.connection.query("UPDATE users SET dashboard=\"" + global.dashboard  + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
            });
            resp.writeHead(302, {
                'Location': 'dashboard'
            });
            resp.end(page)
        });
    }
}

function pre_build(val, resp)
{
    for(var i = 0; i < 2; i++) {
        while (Object.keys(val).length && val.charAt(0) !== ';')
            val = val.substr(1);
        if (Object.keys(val).length && val.charAt(0) === ';')
            val = val.substr(1);
    }
    if (Object.keys(val).length === 0 || (val.charAt(0) < '0' && val.charAt(0) > '9' && val.charAt(0) !== ';')) {
        content += "</div>";
        val = "";

        var data = util.buildPage("Dashboard Page", content);
        resp.writeHead(200, {'Content-Type':'text/html'});
        resp.end(data);
    }
    return (val);
}

function build_widgets(val, resp)
{
    if (val !== null && val !== "" && val !== "null") {
        var tp = val.split(";").map(function (val) { return +val; });
        var pos = 0;

        tp.forEach(function(elem, e) {
            if (elem !== null && elem !== "" && elem !== "NaN") {
                if (elem == 1) {
                    pos++;
                    if (global.country !== null && global.country !== "")
                        weather.buildWeather(pos, elem, function (res) {
                            content += res;
                            val = pre_build(val, resp);
                        });
                } else if (elem == 2) {
                    pos++;
                    content += map.buildMap(pos, elem);
                    val = pre_build(val, resp);
                } else if (elem == 3) {
                    pos++;
                    if (global.currency !== null && global.currency !== "")
                        money.buildMoney(pos, elem, function (res) {
                            content += res;
                            val = pre_build(val, resp);
                        });
                } else if (elem == 4) {
                    pos++;
                    content += discord.buildDiscord(pos, elem);
                    val = pre_build(val, resp);
                } else if (elem == 5) {
                    pos++;
                    minecraft.buildMinecraft(pos, elem, function (res) {
                        content += res;
                        val = pre_build(val, resp);
                    });
                } else if (elem == 6) {
                    pos++;
                    news.buildNews(pos, elem, function (res) {
                        content += res;
                        val = pre_build(val, resp);
                    });
                } else if (elem == 7) {
                    pos++;
                    crypto.buildCrypto(pos, elem, function (res) {
                        content += res;
                        val = pre_build(val, resp);
                    });
                } else if (elem == 8) {
                    pos++;
                    content += soundcloud.buildSoundcloud(pos, elem);
                    val = pre_build(val, resp);
                }
            }
        });    
    }
}

exports.showDashBoardPage = function buildDashBoardPage(req, resp, error_message) {
    content =
    "<div class=\"row tm-content-row tm-mt-big\">" +
    "<div class=\"tm-col tm-col-small\">" +
    "    <div class=\"bg-white tm-block h-100\">" +
    "        <h2 class=\"tm-block-title\">Add Widget</h2>" +
    "        <form method=\"POST\" action=\"add_widget\" class=\"tm-edit-product-form\">";

    if (global.error !== "") {

        content += "<font color=red>" + global.error + "</font><br/><br/>";
        global.error = "";
    }

    content +=
    "                    <div class=\"form-group\">" +
    "                        <label for=\"name\">Refresh Rate</label>" +
    "                        <input placeholder=\"1000\" id=\"refresh\" name=\"refresh\" type=\"text\" class=\"form-control validate\">" +
    "                    </div>" +
    "            <div class=\"input-group mb-3\">" +
    "                        <label for=\"name\">Widget List</label>" +
    "                <select class=\"custom-select col-xl-9 col-lg-8 col-md-8 col-sm-7\" name=\"category\" id=\"category\">" +
    "                    <option selected>Select one</option>";

    if (global.services == null || global.services == "") {
        content += "                </select>" +
        "            </div>" +
        "            <div class=\"input-group mb-3\">" +
        "                <div class=\"ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0\">" +
        "                    <button type=\"submit\" class=\"btn btn-primary\">Add Widget" +
        "                    </button>" +
        "                </div>" +
        "            </div>" +
        "        </form>" +
        "    </div>" +
        "</div>" +
        "</div>";
        
        var data = util.buildPage("Dashboard Page", content);
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
                                "<option value=\"" + widg.id + "\">" + widg.name + "</option>";
                            }
                        });
                    }
                });
            });
        });

    content += "                </select>" +
    "            </div>" +
    "            <div class=\"input-group mb-3\">" +
    "                <div class=\"ml-auto col-xl-8 col-lg-8 col-md-8 col-sm-7 pl-0\">" +
    "                    <button type=\"submit\" class=\"btn btn-primary\">Add Widget" +
    "                    </button>" +
    "                </div>" +
    "            </div>" +
    "        </form>" +
    "    </div>" +
    "</div>";
    
    var val = JSON.parse(JSON.stringify(global.dashboard));
    if (global.dashboard == null || global.dashboard == undefined || global.dashboard == "") {
        content += "</div>";
        val = "";

        var data = util.buildPage("Dashboard Page", content);
        resp.writeHead(200, {'Content-Type':'text/html'});
        resp.end(data);
        return;
    }
    build_widgets(val, resp);
    });
});
}