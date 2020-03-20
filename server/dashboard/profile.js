var util = require('./util');
var edit_error = "";

function buildProfilePage(req, resp, error_message) {
    var content = buildEditAcount() + buildAccountInfos() + buildProfileImage();
    var data = util.buildPage("Profile Page", content);
    resp.writeHead(200, {'Content-Type':'text/html'});
    resp.end(data);
}

exports.showProfilePage = buildProfilePage;


exports.deleteProfile = function deleteProfileAccount(req, resp)
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
            global.connection.query("DELETE FROM users WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
            });
            global.username = "";
            resp.writeHead(302, {
                'Location': 'login'
            });
            resp.end(page)
         });
     }
}

exports.updateProfile = function updateProfileAccount(req, resp)
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
             var user_name = post_data["name"];
             var mail = post_data["email"];
             var psd = post_data["password"];
             var psd2 = post_data["password2"];

             if (user_name !== null && user_name !== "" && user_name !== global.username) {
                if(user_name.length < 3) {
                    edit_error = "Username invalid syntax.";
                } else {
                    global.connection.query("UPDATE users SET username=\"" + user_name  + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
                    });
                    global.username = user_name;
                }

             } else if (mail !== null && mail !== "" && mail !== global.mail) {
                if(mail.length < 3 || mail.indexOf("@") <= -1) {
                    edit_error = "Mail invalid syntax.";
                } else {
                    global.mail = mail;
                    global.connection.query("UPDATE users SET mail=\"" + global.mail  + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
                    });
                }

             } else if (psd !== null && psd2 !== null && psd !== "" && psd !== global.password && psd2 !== "" && psd2 != global.password) {
                if (psd.length < 3) {
                    edit_error = "Password invalid syntax.";
                } else if (psd !== psd2) {
                    edit_error = "Password are not equals.";
                 } else {
                    global.password = psd;
                    global.connection.query("UPDATE users SET password=\"" + global.password + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
                    });
                 }
             } else {
                edit_error = "Please, check your input.";
             }
             buildProfilePage(req, resp);
         });
     }
}

function buildEditAcount()
{
    var data = "<div class=\"row tm-content-row tm-mt-big\">" +
    "<div class=\"tm-col tm-col-big\">" +
    "    <div class=\"bg-white tm-block\">" +
    "        <div class=\"row\">" +
    "            <div class=\"col-12\">" +
    "                <h2 class=\"tm-block-title\">Edit Account</h2>" +
    "            </div>" +
    "        </div>";
    if (edit_error !== "") {
        data += "<font color=red>" + edit_error + "</font><br/><br/>";
        edit_error = "";
    }
    data +=
    "        <div class=\"row\">" +
    "            <div class=\"col-12\">" +
    "                <form method=\"POST\" action=\"update_profile\" class=\"tm-signup-form\">" +
    "                    <div class=\"form-group\">" +
    "                        <label for=\"name\">Account Name</label>" +
    "                        <input placeholder=\"" + global.username + "\" id=\"name\" name=\"name\" type=\"text\" class=\"form-control validate\">" +
    "                    </div>" +
    "                    <div class=\"form-group\">" +
    "                        <label for=\"email\">Account Email</label>" +
    "                        <input placeholder=\"" + global.mail + "\" id=\"email\" name=\"email\" type=\"email\" class=\"form-control validate\">" +
    "                    </div>" +
    "                    <div class=\"form-group\">" +
    "                        <label for=\"password\">Password</label>" +
    "                        <input placeholder=\"******\" id=\"password\" name=\"password\" type=\"password\" class=\"form-control validate\">" +
    "                    </div>" +
    "                    <div class=\"form-group\">" +
    "                        <label for=\"password2\">Re-enter Password</label>" +
    "                        <input placeholder=\"******\" id=\"password2\" name=\"password2\" type=\"password\" class=\"form-control validate\">" +
    "                    </div>" +
    "                        <div class=\"col-12 col-sm-4\">" +
    "                            <button type=\"submit\" class=\"btn btn-primary\">Update" +
    "                            </button>" +
    "                        </div>" +
    "                </form>" +
    "                <form method=\"POST\" action=\"delete_profile\" class=\"tm-signup-form\">" +
    "                        <div class=\"col-12 col-sm-8\">" +
    "                            <button type=\"submit\" class=\"btn btn-danger\">Delete Account" +
    "                            </button>" +
    "                        </div>" +
    "                </form>" +

    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</div>";
    return (data);
}


exports.updateInfos = function updateProfileInfos(req, resp)
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
             var country = post_data["country"];
             var currency = post_data["currency"];
             var discord = post_data["discord"];
             var minecraft = post_data["minecraft"];
             var soundcloud = post_data["soundcloud"];

             if (country !== null && country !== "" && country !== global.country) {
                    global.country = country;
                    global.connection.query("UPDATE users SET country=\"" + global.country  + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
                    });
             }
             if (currency !== null && currency !== "" && currency !== global.currency) {
                    global.currency = currency;
                    global.connection.query("UPDATE users SET currency=\"" + global.currency  + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
                    });
             }
             if (discord !== null && discord !== "" && discord !== global.discord) {
                    global.discord = discord;
                    global.connection.query("UPDATE users SET discord=\"" + global.discord  + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
                    });
             }
             if (minecraft !== null && minecraft !== "" && minecraft !== global.minecraft) {
                    global.minecraft = minecraft;
                    global.connection.query("UPDATE users SET minecraft=\"" + global.minecraft  + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
                    });
             }
             if (soundcloud !== null && soundcloud !== "" && soundcloud !== global.soundcloud) {
                    global.soundcloud = soundcloud;
                    global.connection.query("UPDATE users SET soundcloud=\"" + global.soundcloud  + "\" WHERE username=\"" + global.username + "\"", function(err, rows, fields) {
                    });
             }
             buildProfilePage(req, resp);
         });
     }
}

function buildAccountInfos()
{
    return ("<div class=\"tm-col tm-col-big\">" +
        "    <div class=\"bg-white tm-block\">" +
        "        <div class=\"row\">" +
        "            <div class=\"col-12\">" +
        "                <h2 class=\"tm-block-title\">Account Informations</h2>" +
        "            </div>" +
        "        </div>" +
        "        <div class=\"row\">" +
        "            <div class=\"col-12\">" +
        "                <form method=\"POST\" action=\"update_infos\" class=\"tm-signup-form\">" +
        "                    <div class=\"form-group\">" +
        "                        <label for=\"name\">Country / City</label>" +
        "                        <input placeholder=\"" + global.country + "\" id=\"country\" name=\"country\" type=\"text\" class=\"form-control validate\">" +
        "                    </div>" +
        "                    <div class=\"form-group\">" +
        "                        <label for=\"name\">Currency</label>" +
        "                        <input placeholder=\"" + global.currency + "\" id=\"currency\" name=\"currency\" type=\"text\" class=\"form-control validate\">" +
        "                    </div>" +
        "                    <div class=\"form-group\">" +
        "                        <label for=\"name\">Discord Server ID</label>" +
        "                        <input placeholder=\"" + global.discord + "\" id=\"discord\" name=\"discord\" type=\"text\" class=\"form-control validate\">" +
        "                    </div>" +
        "                    <div class=\"form-group\">" +
        "                        <label for=\"name\">Minecraft Server Host</label>" +
        "                        <input placeholder=\"" + global.minecraft + "\" id=\"minecraft\" name=\"minecraft\" type=\"text\" class=\"form-control validate\">" +
        "                    </div>" +
        "                    <div class=\"form-group\">" +
        "                        <label for=\"name\">SoundCloud Playlist</label>" +
        "                        <input placeholder=\"" + global.soundcloud + "\" id=\"soundcloud\" name=\"soundcloud\" type=\"text\" class=\"form-control validate\">" +
        "                    </div>" +
        "                    <div class=\"row\">" +
        "                        <div class=\"col-12 col-sm-4\">" +
        "                            <button type=\"submit\" class=\"btn btn-primary\">Update" +
        "                            </button>" +
        "                        </div>" +
        "                    </div>" +
    
        "                </form>" +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>");
}

function buildProfileImage()
{
    return ("<div class=\"tm-col tm-col-small\">" +
    "    <div class=\"bg-white tm-block\">" +
    "        <h2 class=\"tm-block-title\">Profile Image</h2>" +
    "        <img src=\"img/profile-image.png\" alt=\"Profile Image\" class=\"img-fluid\">" +
    "        <div class=\"custom-file mt-3 mb-3\">" +
    "            <input id=\"fileInput\" type=\"file\" style=\"display:none;\" />" +
    "            <input type=\"button\" class=\"btn btn-primary d-block mx-xl-auto\" value=\"Upload New...\" onclick=\"document.getElementById('fileInput').click();\"" +
    "            />" +
    "        </div>" +
    "    </div>" +
    "</div>" +
    "</div>");
}