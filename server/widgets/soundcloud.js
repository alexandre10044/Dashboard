
let util = require('./util');
var request = require('request');

exports.buildSoundcloud = function build_soundcloud(pos, id, callback)
{
    var content =
    "<div class=\"tm-col tm-col-big\">" +
    "    <div class=\"bg-white tm-block h-100\">" +
    util.BuildWidgetTopBar(pos, id) +
    "        <h2 class=\"tm-block-title\">Sound Cloud</h2>" +
    "<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\"" +
    "src=\"" + global.soundcloud + "\">" +
    "</iframe>" +
    "</div>" +
    "</div>";

    return (content);
}