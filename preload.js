// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

window.log = function(text) {
    fs.appendFileSync("actions.log", window.uuid + "," + text + "\n")
}
window.undolog = function(line_count) {
    var log = fs.readFileSync("actions.log", "utf8");
    var lines = log.trim().split("\n")

    var new_log = lines.slice(0, 0 - line_count).join("\n") + "\n";

    fs.writeFileSync("actions.log", new_log);
}
window.new_uuid = function() {
    window.uuid = uuidv4();
}
if (!fs.existsSync('actions.log') || fs.readFileSync('actions.log', 'utf8').trim() == "") {
    fs.appendFileSync("actions.log", "game_uuid,player,action_type,piece,captured_piece,old_position,new_position\n")      
}
window.new_uuid()