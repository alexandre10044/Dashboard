
let util = require('./util');
var request = require('request');

exports.buildMinecraft = function build_minecraft(pos, id, callback)
{
    var url = 'http://mcapi.us/server/status?ip=' + global.minecraft + '&port=25565';
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Error getting Minecraft server status...');
            }
            body = JSON.parse(body);
            var status = 'Minecraft server is currently offline';
            if(body.online) {
                status = 'Minecraft server is online';
            }
            var content =
            "<div class=\"tm-col tm-col-small\">" +
            "    <div class=\"bg-white tm-block h-100\">" +
            util.BuildWidgetTopBar(pos, id) +
            "        <h2 class=\"tm-block-title\">Minecraft Status</h2>" +
            "<label class=\"tm-list-group-item\">Name: " + body.server.name + "</label>" +
            "<label class=\"tm-list-group-item\">" + status + "</label>" +
            "<label class=\"tm-list-group-item\">" + body.players.now + "/" + body.players.max + " online players on the server</label>" +
            "</div>" +
            "</div>";
            callback(content);
        });
}