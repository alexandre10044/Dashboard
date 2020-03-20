var http_url = require('url');

exports.buildPage = function(page_title, page_content) {
   var page_template = "<html>" +
         "<head>" +
         "<title>{page_title}</title>" +
         "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
         "<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">" +
         "<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Open+Sans:300,400,600\">" +
         "<link rel=\"stylesheet\" href=\"css/fontawesome.min.css\">" +
         "<link rel=\"stylesheet\" href=\"css/fullcalendar.min.css\">" +
         "<link rel=\"stylesheet\" href=\"css/bootstrap.min.css\">" +
         "<link rel=\"stylesheet\" href=\"css/tooplate.css\">" +
         "<script src=\"http://openexchangerates.github.io/money.js/money.js\"></script>";


    if (page_title == "Dashboard Page") {
        page_template += "<script type=\"text/javascript\">" +
        "function autoRefreshPage()" +
        "{" +
        "    window.location = window.location.href;" +
        "}" +
        "setInterval('autoRefreshPage()', 30000);" +
                    "</script>";

    }

         page_template += 
         "</head>" +
         "<body  onload=\"InitializeTimer(5)\" id=\"reportsPage\" class=\"bg02\">" +
        "<div class=\"\" id=\"home\">" +
            "<div class=\"container\">" +
                "<div class=\"row\">" +
                    "<div class=\"col-12\">" +
                        "<nav class=\"navbar navbar-expand-xl navbar-light bg-light\">" +
                            "<a class=\"navbar-brand\" href=\"dashboard\">" +
                                "<i class=\"fas fa-3x fa-tachometer-alt tm-site-icon\"></i>" +
                                "<h1 class=\"tm-site-title mb-0\">Dashboard</h1>" +
                            "</a>" +
                            "<button class=\"navbar-toggler ml-auto mr-0\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\"" +
                                "aria-expanded=\"false\" aria-label=\"Toggle navigation\">" +
                                "<span class=\"navbar-toggler-icon\"></span>" +
                            "</button>" +

                            "<div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">" +
                                "<ul class=\"navbar-nav mx-auto\">" +
                                    "<li class=\"nav-item\">" +
                                        "<a class=\"nav-link\" href=\"dashboard\">Dashboard" +
                                            "<span class=\"sr-only\">(current)</span>" +
                                        "</a>" +
                                    "</li>" +
                                    "<li class=\"nav-item\">" +
                                        "<a class=\"nav-link\" href=\"services\">Services</a>" +
                                    "</li>" +
                                    "<li class=\"nav-item\">" +
                                        "<a class=\"nav-link\" href=\"widgets\">Widgets</a>" +
                                    "</li>" +
                                    "<li class=\"nav-item dropdown\">" +
                                        "<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true" +
                                            "aria-expanded=\"false\">" +
                                            "Settings" +
                                        "</a>" +
                                        "<div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">" +
                                            "<a class=\"dropdown-item\" href=\"profile\">Profile</a>" +
                                        "</div>" +
                                    "</li>" +
                                "</ul>" +
                                "<ul class=\"navbar-nav\">" +
                                    "<li class=\"nav-item\">" +
                                        "<a class=\"nav-link d-flex\" href=\"login\">" +
                                            "<i class=\"far fa-user mr-2 tm-logout-icon\"></i>" +
                                            "<span>Logout</span>" +
                                        "</a>" +
                                    "</li>" +
                                "</ul>" +
                            "</div>" +
                        "</nav>" +
                    "</div>" +
                "</div>" +
                "{page_content}" +

            "<footer class=\"row tm-mt-small\">" +
            "<div class=\"col-12 font-weight-light\">" +
            "        <p class=\"d-inline-block tm-bg-black text-white py-2 px-4\">" +
            "            Dashboard Copyright &copy; 2019. Created by" +
            "            <a lass=\"text-white tm-footer-link\">Alexandre & Youssef</a> |  Epitech" +
            "        </p>" +
            "    </div>" +
            "</footer>" +
                "<script src=\"js/jquery-3.3.1.min.js\"></script>" +
                "<script src=\"js/moment.min.js\"></script>" +
                "<script src=\"js/utils.js\"></script>" +
                "<script src=\"js/Chart.min.js\"></script>" +
                "<script src=\"js/fullcalendar.min.js\"></script>" +
                "<script src=\"js/bootstrap.min.js\"></script>" +
                "<script src=\"js/tooplate-scripts.js\"></script>" +
                "<script>" +
                "    let ctxLine," +
                "        ctxBar," +
                "        ctxPie," +
                "        optionsLine," +
                "        optionsBar," +
                "        optionsPie," +
                "        configLine," +
                "        configBar," +
                "        configPie," +
                "        lineChart;" +
                "    barChart, pieChart;" +
                "    // DOM is ready" +
                "    $(function () {" +
                "        updateChartOptions();" +
                "        drawLineChart(); // Line Chart" +
                "        drawBarChart(); // Bar Chart" +
                "        drawPieChart(); // Pie Chart" +
                "        drawCalendar(); // Calendar" +
                "        $(window).resize(function () {" +
                "            updateChartOptions();" +
                "            updateLineChart();" +
                "            updateBarChart();" +
                "            reloadPage();" +
                "        });" +
                "    })" +
                "</script>" +
            "</div>" +
         "</body></html>";
   
   var ret = page_template;
   ret = ret.replace("{page_title}", page_title, "g");
   ret = ret.replace("{page_title}", page_title, "g");
   ret = ret.replace("{page_content}", page_content, "g");
   return ret;
}