// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const fs = require('fs');

window.log = function(text) {
    fs.appendFileSync("actions.log", text + "\n")
}
window.log("player,action_type,piece,captured_piece,old_position,new_position")