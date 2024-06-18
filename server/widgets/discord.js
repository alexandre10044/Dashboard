
let util = require('./util');

exports.buildDiscord = function build_discord_widget(pos, id, callback)
{
    var content =
    "<div class=\"tm-col tm-col-big\">" +
    "    <div class=\"bg-white tm-block h-100\">" +
    util.BuildWidgetTopBar(pos, id) +
    "        <h2 class=\"tm-block-title\">Discord</h2>" +
    "<iframe src=\"https://discordapp.com/widget?id=" + global.discord + "&theme=dark\" width=\"450\" height=\"500\" allowtransparency=\"true\" frameborder=\"0\"></iframe>" +
    "</div>" +
    "</div>";

    return (content);
}