var http_url = require('url');

exports.getUrlParams = function(req, resp) {
   
   req.query_url = http_url.parse(req.url, true);
   console.log(req.query_url);
   req.user_name = req.query_url.user_name;
   req.password = req.query_url.password;
   req.email = req.query_url.email;
   req.mobile_phone = req.query_url.mobile_phone;
   req.home_phone = req.query_url.home_phone;
}

exports.pageMenu = function() {
   var ret = '<a href="/">Home</a>';
   ret += '&nbsp&nbsp';
   ret += '<a href="/register">Register</a>';
   ret += '&nbsp&nbsp';
   ret += '<a href="/login">Login</a>';
   
   return ret;
}

exports.buildPage = function(page_title, page_menu, page_content) {
   var page_template = "<html>" +
         "<head>" +
         "<title>{page_title}</title>" +
         "<meta charset=\"UTF-8\">" +
         "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" +
         "<link rel=\"icon\" type=\"image/png\" href=\"images/icons/favicon.ico\"/>" +
         "<link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/bootstrap/css/bootstrap.min.css\">" +
         "<link rel=\"stylesheet\" type=\"text/css\" href=\"fonts/font-awesome-4.7.0/css/font-awesome.min.css\">" +
         "<link rel=\"stylesheet\" type=\"text/css\" href=\"fonts/iconic/css/material-design-iconic-font.min.css\">" +
         "<link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/animate/animate.css\">" +
         "<link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/css-hamburgers/hamburgers.min.css\">" +
         "<link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/animsition/css/animsition.min.css\">" +
         "<link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/select2/select2.min.css\">" +
         "<link rel=\"stylesheet\" type=\"text/css\" href=\"vendor/daterangepicker/daterangepicker.css\">" +
         "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/util.css\">" +
         "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/main.css\">" +
         "</head>" +
         "<body>" +
         "<div class=\"limiter\">" +
         "<div class=\"container-login100\" style=\"background-image: url('images/bg-01.jpg');\">" +
         "<div class=\"wrap-login100\">" +
         "{page_content}" +
         "<tr><td>{page_menu}</td></tr><tr>" +
         "</div></div></div>" +
         "<div id=\"dropDownSelect1\"></div>" +
         "<script src=\"vendor/jquery/jquery-3.2.1.min.js\"></script>" +
         "<script src=\"vendor/animsition/js/animsition.min.js\"></script>" +
         "<script src=\"vendor/bootstrap/js/popper.js\"></script>" +
         "<script src=\"vendor/bootstrap/js/bootstrap.min.js\"></script>" +
         "<script src=\"vendor/select2/select2.min.js\"></script>" +
         "<script src=\"vendor/daterangepicker/moment.min.js\"></script>" +
         "<script src=\"vendor/daterangepicker/daterangepicker.js\"></script>" +
         "<script src=\"vendor/countdowntime/countdowntime.js\"></script>" +
         "<script src=\"js/main.js\"></script>" +
         "</body></html>";
   
   var ret = page_template;
   ret = ret.replace("{page_title}", page_title, "g");
   ret = ret.replace("{page_title}", page_title, "g");
   ret = ret.replace("{page_menu}", page_menu, "g");
   ret = ret.replace("{page_content}", page_content, "g");
   return ret;
}