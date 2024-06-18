
let util = require('./util');

exports.buildMap = function build_map_widget(pos, id, callback)
{
    var content =
    "<div class=\"tm-col tm-col-big\">" +
    "    <div class=\"bg-white tm-block h-100\">" +
    util.BuildWidgetTopBar(pos, id) +
    "        <h2 class=\"tm-block-title\">Google Map</h2>" +
    "<div style=\"width: 100%\"><iframe width=\"100%\" height=\"600\" src=\"https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=" + global.country + "+(Map)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\"><a href=\"https://www.maps.ie/coordinates.html\">find my location</a></iframe></div><br />" +
    "</div>" +
    "</div>";

    return (content);
}