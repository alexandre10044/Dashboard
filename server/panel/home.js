var util = require('./util');

exports.showHomePage = function buildLoginPage(req, resp, error_message) {
    var content = "<span class=\"login100-form-logo\"><i class=\"zmdi zmdi-landscape\"></i></span><font color='black'></br>Welcome to My Amazing Dashboard !</br>Click above link to take action.</br></font>";
    var data = util.buildPage("Home Page", util.pageMenu(), content);
    resp.writeHead(200, {'Content-Type':'text/html'});
    resp.end(data);
}