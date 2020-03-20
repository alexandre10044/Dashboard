
exports.BuildWidgetTopBar = function widg_top_bar(pos, id)
{
    var content = 
    "<form method=\"POST\" action=\"left_widget\">" +
        "<input type=\"hidden\" name=\"widget_id\" value=\"" + id + "\">" +
        "<input type=\"hidden\" name=\"widget_pos\" value=\"" + pos + "\">" +
    "        <td><button type=\"submit\" class=\"fas tm-trash-icon\"><-</button></td>" +
    "</form>" +
    "<form method=\"POST\" action=\"right_widget\">" +
        "<input type=\"hidden\" name=\"widget_id\" value=\"" + id + "\">" +
        "<input type=\"hidden\" name=\"widget_pos\" value=\"" + pos + "\">" +
    "        <td><button type=\"submit\" class=\"fas tm-trash-icon\">-></button></td>" +
    "</form>" +
    "<form method=\"POST\" action=\"remove_widget\">" +
        "<input type=\"hidden\" name=\"widget_id\" value=\"" + id + "\">" +
        "<input type=\"hidden\" name=\"widget_pos\" value=\"" + pos + "\">" +
    "        <td><button type=\"submit\" class=\"fas fa-trash-alt tm-trash-icon\"></button></td>" +
    "</form>";
    return (content);
}