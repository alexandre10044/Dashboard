var http = require('http');
var url = require('url');
var http = require('http');
var nStatic = require('node-static');
var fileServer = new nStatic.Server('./rsc');

var util = require('./panel/util');
var home = require('./panel/home');
var login = require('./panel/login');
var register = require('./panel/register');
var dashboard = require('./dashboard/dashboard');
var profile = require('./dashboard/profile');
var services = require('./dashboard/services');
var widgets = require('./dashboard/widgets');

function server_about(req, resp)
{
    let obj = { 
        customer: {
            host: req.connection.remoteAddress.substr(7)
        },
        server: {
            current_time: Math.floor(Date.now() / 1000),
            services: []
        }
    };
    global.connection.query("SELECT * FROM services", function (err, result, fields) {
        if (err) throw err;
        global.connection.query("SELECT * FROM widgets", function (err, widg_list, f) {
            if (err) throw err;
            result.forEach(function(elem, e) {
                let serv = {
                    name: elem.name,
                    widgets: []
                }
                if (elem.widgets !== null) {
                    var widgs = elem.widgets.split(";").map(function (val) { return +val; });
                    widgs.forEach(function(tmp, t) {
                        if (tmp !== 0) {
                            if (err) throw err;
                            widg_list.forEach(function(widg, w) {
                                if (tmp == widg.id) {
                                    let q = {
                                        name: widg.name,
                                        description: widg.description,
                                        params: []
                                    }
                                    serv.widgets.push(q);
                                }
                            });
                        }
                    });
                }
                obj.server.services.push(serv);
            });
            var myJSON = JSON.stringify(obj); 
            resp.writeHead(200, {'Content-Type':'text/html'});
            resp.end(myJSON);
        });
    });
}

function dashboard_requests(page, req, res)
{
    if (page === '/dashboard' || page === '/services' || page === '/profile' || page === '/widgets'
    || page === '/new_service' || page === '/remove_service' || page === '/update_profile'
    || page === '/delete_profile' || page === '/add_widget' || page === '/update_infos'
    || page === '/left_widget' || page === '/right_widget' || page === '/remove_widget') {
        if (global.username == '') {
            res.writeHead(302, {
                'Location': 'login'
            });
            res.end(page)
            return (true);
        }
    } else
        return (false);

    if(page === '/dashboard') {
        dashboard.showDashBoardPage(req, res);
    } else if(page === '/services') {
        services.showServicesPage(req, res);
    } else if(page === '/profile') {
        profile.showProfilePage(req, res);
    } else if(page === '/widgets') {
        widgets.showWidgetsPage(req, res);
    } else if (page === '/new_service') {
        services.newServicePage(req, res);
    } else if (page === '/remove_service') {
        services.deleteServicePage(req, res);
    } else if (page === '/update_profile') {
        profile.updateProfile(req, res);
    } else if (page === '/delete_profile') {
        profile.deleteProfile(req, res);
    } else if (page === '/add_widget') {
        widgets.addWidget(req, res);
    } else if (page === '/update_infos') {
        profile.updateInfos(req, res);
    } else if (page === '/left_widget') {
        dashboard.showLeftBoardPage(req, res);
    } else if (page === '/right_widget') {
        dashboard.showRightBoardPage(req, res);
    } else if (page === '/remove_widget') {
        dashboard.showRemoveBoardPage(req, res);
    }
    return (true);
}

var server = http.createServer(function(req, res) {
    util.getUrlParams(req, res)
    var page = url.parse(req.url).pathname;

    if (dashboard_requests(page, req, res))
    { } else if(page === '/') {
        home.showHomePage(req, res);
    } else if(page === '/login') {
        global.username = '';
        login.showLoginPage(req, res);
    } else if (page === '/about.json') {
        server_about(req, res);
    } else if(page === '/check-login') {
        login.checkLoginAccount(req, res);
    } else if(page === '/register') {
        register.showRegisterPage(req, res);
    } else if(page === '/register-submit') {
        register.registerSubmit(req, res);
    } else if(page === '/callback') {
        login.showConfirmCallback(req, res);
    } else if(page.startsWith("/images") || page.startsWith("/fonts") || page.startsWith("/css") ||
        page.startsWith("/js") || page.startsWith("/vendor") || page.startsWith("/img")  || page.startsWith("/js") ||
        page.startsWith("/webfonts") || page.startsWith("/jquery-ui-datepicker")) {
        fileServer.serve(req, res);
    } else {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end("Request url is not valid : " + req.url.toString());
    }
});

server.listen(8080);