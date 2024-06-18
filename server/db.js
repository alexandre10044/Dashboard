let mysql = require('mysql');

var util = require('./panel/util');
var login = require('./panel/login')

let connected = false;
global.connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'db'
});

global.username = "";
global.password = "";
global.mail = "";
global.services = "";
global.dashboard = "";
global.country = "";
global.currency = "";
global.discord = "";
global.soundcloud = "";

exports.CheckUser = function CheckUser(resp, req, username, password) {
    var str = "SELECT * FROM users where username = '" + username + "'";
    if (openDb() == false)
        return (null);
        global.connection.query(str, function (err, result, fields) {
        var found = false;
        if (err) return (false);
        result.forEach(function(element, index) {
            if (element.password.localeCompare(password) == 0 && element.username.localeCompare(username) == 0) {
                resp.writeHead(200, {'Content-Type':'text/html'});
                page = util.buildPage("Login success", util.pageMenu(), "<font color=red>Login success.</font>");
                global.username = username;
                global.password = password;
                global.mail = element.mail;
                global.services = element.services;
                global.dashboard = element.dashboard;
                global.country = element.country;
                global.currency = element.currency;
                global.discord = element.discord;
                global.minecraft = element.minecraft;
                global.soundcloud = element.soundcloud;
                resp.writeHead(302, {
                    'Location': 'dashboard'
                });
                resp.end(page)
                found = true;
                return (true);
            }
        });
        if (found !== true) {
            req.user_name = username;
            req.password = password;
            login.buildLoginPage(req, resp, 'Please, check username or password.')
        }
    });
}

exports.InsertUser = function InsertUser(username, password, mail) {
    var str = "INSERT INTO users VALUES (NULL, '"
        + username + "', '"
        + password + "', '"
        + mail + "', '', '', 'Paris', 'EUR', '262600942518665217', 'druglegends.net', 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&amp')";
    executeCommand(str);
    return (true);
}

function executeCommand(command)
{
    if (openDb() == false)
        return (false);
    global.connection.query(command, function(err, rows, fields) {
        if (err) return (false);
        return (true);
    });
}

function executeCommandWithResult(command)
{
    if (openDb() == false)
        return (null);
        global.connection.query(command, function (err, result, fields) {
        if (err) return (null);
        return (result);
    });
}

function openDb() {
    if (connected == true)
        return (true);
        global.connection.connect(function(err) {
        if (err) {
            console.error('error: ' + err.message);
            return (false);
        }
        console.log('Connected to the MySQL server.');
        connected = true;
        return (true);
    });
}