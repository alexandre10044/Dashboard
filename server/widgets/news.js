
let util = require('./util');
var request = require('request');

exports.buildNews = function build_news(pos, id, callback)
{
    var url = "https://newsapi.org/v2/everything?q=" + global.country + "&from=&sortBy=publishedAt&apiKey=1d892a7a2e8f472e878cc1d5e6e664db";
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return;
            }
            body = JSON.parse(body);
            var content =
            "<div class=\"tm-col tm-col-small\">" +
                "    <div class=\"bg-white tm-block h-100\">" +
                util.BuildWidgetTopBar(pos, id) +
                "        <h2 class=\"tm-block-title\">Politic News</h2>" +
            
                "<ol class=\"tm-list-group tm-list-group-alternate-color tm-list-group-pad-big\">";

                for (var i = 0; i < 7; i++) {
                    content += "<li class=\"tm-list-group-item\">" +
                    "<a href=\"" + body.articles[i].url + "\" class=\"tm-link-black\">" + body.articles[i].title + "</a>" +
                    "</li>";
                }
            
                content +=    "</ol>" +
                    "</div>" +
                    "</div>";
            callback(content);
        });
}