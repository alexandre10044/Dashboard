var url = require('url');
const {google} = require('googleapis');
var util = require('./util');
var db = require('../db');

const compute = google.compute('v1');

exports.showLoginPage = function(req, resp) {
   buildLoginPage(req, resp, '');
}

exports.showConfirmCallback = function(req, resp) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    if (query != undefined && query != null) {
        var code = query.code;
        var scope = query.scope;

        if (code != undefined && scope != undefined &&
            scope != null && scope != null) {
                db.CheckUser(resp, req, "test", "starwars");
                return;
            }
    }
    resp.writeHead(200, {'Content-Type':'text/html'});
    resp.end("");
}

exports.checkLoginAccount = function(req, resp) {
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
            var user_name = post_data["user_name"];
            var password = post_data["password"];
            if (user_name.length < 3 || password.length < 3) {
                buildLoginPage(req, resp, 'User name or password syntax is incorrect.')
                return;
            }
            db.CheckUser(resp, req, user_name, password);
        });
    }
}

exports.buildLoginPage = buildLoginPage;

function buildLoginPage(req, resp, error_message) {
    var login_form = ""; //"<h3>Input user name and password to login.</h3>";

    const oauth2Client = new google.auth.OAuth2(
        "661068663130-gbtqj7arvli01bspmimt584rhhpqb4ff.apps.googleusercontent.com",
        "CF3x-0WpcVHXLa29vDmIznGt",
        "http://127.0.0.1:8080/callback",
    );

    // generate a url that asks permissions for Blogger and Google Calendar scopes
    const scopes = [
        'https://www.googleapis.com/auth/blogger'
    ];

    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: scopes
    });

    util.getUrlParams(req, resp);
    if(error_message!=='' && error_message!==null && error_message!==undefined)
    {
        login_form += "<font color=red>" + error_message + "</font><br/><br/>";
    }
    login_form += "<form class=\"login100-form validate-form\" method='post' action='/check-login'>" +
    "<span class=\"login100-form-logo\">" +
        "<i class=\"zmdi zmdi-landscape\"></i>" +
    "</span>" +

    "<span class=\"login100-form-title p-b-34 p-t-27\">" +
        "Login" +
    "</span>" +

    "<div class=\"wrap-input100 validate-input\" data-validate = \"Enter username\">" +
        "<input class=\"input100\" type=\"text\" name=\"user_name\" value = \"{user_name}\" placeholder=\"Username\">" +
        "<span class=\"focus-input100\" data-placeholder=\"&#xf207;\"></span>" +
    "</div>" +

    "<div class=\"wrap-input100 validate-input\" data-validate=\"Enter password\">" +
        "<input class=\"input100\" type=\"password\" name=\"password\" value = \"{password}\" placeholder=\"Password\">" +
        "<span class=\"focus-input100\" data-placeholder=\"&#xf191;\"></span>" +
    "</div>" +

    "<div class=\"contact100-form-checkbox\">" +
        "<input class=\"input-checkbox100\" id=\"ckb1\" type=\"checkbox\" name=\"remember-me\">" +
        "<label class=\"label-checkbox100\" for=\"ckb1\">" +
            "Remember me" +
        "</label>" +
    "</div>" +
    "<div class=\"container-login100-form-btn\">" +
        "<button type=\"submit\" class=\"login100-form-btn\">" +
            "Login" +
        "</button>" +
    "</div>" +

    "<div class=\"text-center p-t-90\">" +
        "<a class=\"txt1\" href=\"" + url + "\">" +
            "Connect with Google" +
        "</a>" +
    "</div>" +

    "<div class=\"text-center p-t-90\">" +
        "<a class=\"txt1\" href=\"register\">" +
            "Are you new user ?" +
        "</a>" +
    "</div>" +
        "</form>";
    if(req.user_name==null || req.user_name==undefined) {
        req.user_name = '';
    }
    if(req.password==null || req.password==undefined) {
        req.password = '';
    }
    login_form = login_form.replace("{user_name}", req.user_name);
    login_form = login_form.replace("{password}", req.password);
    var login_page_data = util.buildPage("Login Page", util.pageMenu(), login_form);
    resp.writeHead(200, {'Content-Type':'text/html'});
    resp.end(login_page_data);
}