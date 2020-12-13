// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const fs = require('fs');

window.log = function(text) {
    fs.appendFileSync("actions.log", text + "\n")
}
window.undolog = function(line_count) {
    var log = fs.readFileSync("actions.log", "utf8");
    var lines = log.trim().split("\n")

    var new_log = lines.slice(0, 0 - line_count).join("\n") + "\n";

    fs.writeFileSync("actions.log", new_log);
}



window.log("player,action_type,piece,captured_piece,old_position,new_position")