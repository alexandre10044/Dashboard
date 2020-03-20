var util = require('./util');
var db = require('../db');

exports.showRegisterPage = function (req, resp) {
    buildRegisterPage(req, resp, "");
}

exports.registerSubmit = function (req, resp) {
    var query_string = require('querystring');
    var page_data;

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
            var mail = post_data["email"];
            if (user_name.length < 3 || password.length < 3) {
                page_data = buildRegisterPage(req, resp, 'User name or password syntax is incorrect.');
            } else if(mail.length < 3 || mail.indexOf("@") <= -1) {
                page_data = buildRegisterPage(req, resp, 'Invalid mail')
            } else {
                resp.writeHead(200, {'Content-Type':'text/html'});
                if (db.InsertUser(user_name, password, mail) == false) {
                    page_data = buildRegisterPage(req, resp, "Database error, registration failed :(");
                } else {
                    // var nodemailer = require('nodemailer');

                    // var transporter = nodemailer.createTransport({
                    // service: 'gmail',
                    // auth: {
                    //     user: 'epitechdashboard422@gmail.com',
                    //     pass: 'epitech42'
                    // }
                    // });

                    // var mailOptions = {
                    // from: 'epitechdashboard422@gmail.com',
                    // to: mail,
                    // subject: 'Confirm yur registration',
                    // text: 'Hello, Please confirm your registration : http://127.0.0.1:800/confirm' + 
                    // };

                    // transporter.sendMail(mailOptions, function(error, info){
                    // if (error) {
                    //     console.log(error);
                    // } else {
                    //     console.log('Email sent: ' + info.response);
                    // }
                    // }); 
                    page_data = buildRegisterPage(req, resp, "User info registration success.");
                }
            }
            resp.end(page_data);
        });
    }
}

function buildRegisterPage(req, resp, error_message) {
    var page_data;
    var data = "";

    util.getUrlParams(req, resp);

    if(error_message!=='' && error_message!==null && error_message!==undefined)
    {
        data += "<font color=red>" + error_message + "</font><br/><br/>";
    }
    
    data += "<form class=\"login100-form validate-form\" method='post' action='/register-submit'>" +
    "<span class=\"login100-form-logo\">" +
        "<i class=\"zmdi zmdi-landscape\"></i>" +
    "</span>" +

    "<span class=\"login100-form-title p-b-34 p-t-27\">" +
        "Register" +
    "</span>" +

    "<div class=\"wrap-input100 validate-input\" data-validate = \"Enter username\">" +
        "<input class=\"input100\" type=\"text\" name=\"user_name\" value = \"{user_name}\" placeholder=\"Username\">" +
        "<span class=\"focus-input100\" data-placeholder=\"&#xf207;\"></span>" +
    "</div>" +

    "<div class=\"wrap-input100 validate-input\" data-validate=\"Enter password\">" +
        "<input class=\"input100\" type=\"password\" name=\"password\" value = \"{password}\" placeholder=\"Password\">" +
        "<span class=\"focus-input100\" data-placeholder=\"&#xf191;\"></span>" +
    "</div>" +

    "<div class=\"wrap-input100 validate-input\" data-validate=\"Enter mail\">" +
        "<input class=\"input100\" type=\"mail\" name=\"email\" placeholder=\"Mail\">" +
        "<span class=\"focus-input100\" data-placeholder=\"&#xf191;\"></span>" +
    "</div>" +

    "<div class=\"container-login100-form-btn\">" +
        "<button type=\"submit\" class=\"login100-form-btn\">" +
            "Register" +
        "</button>" +
    "</div>" +

    "<div class=\"text-center p-t-90\">" +
        "<a class=\"txt1\" href=\"login\">" +
            "Already registered?" +
        "</a>" +
    "</div>" +
        "</form>";
    if(req.user_name==null || req.user_name==undefined)
    {
        req.user_name = '';
    }
    if(req.password==null || req.password==undefined)
    {
        req.password = '';
    }
    if(req.email==null || req.email==undefined)
    {
        req.email = '';
    }
    data = data.replace("{user_name}", req.user_name);
    data = data.replace("{password}", req.password);
    data = data.replace("{email}", req.email);
    page_data = util.buildPage("Register Page", util.pageMenu(), data);
    resp.writeHead(200, {'Content-Type':'text/html'});
    resp.end(page_data);
}