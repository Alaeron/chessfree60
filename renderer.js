// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var state_history = []
var log_history = []

function onDrop(source, target, piece, newPos, oldPos, orientation) {
    var log_line_count  = 0
    
    // Determine move type
    var type = "move"
    if (source == "spare") {
        type = "summon"
    }

    // Eliminate indecision
    if (source == target) {
        return
    }

    // Save to history for undo
    if (state_history.push(window.Chessboard.objToFen(newPos)) > 100 ) {
        state_history.shift()
        log_history.shift()
    }

    // Determine player
    player = 'black'
    if (piece.indexOf('w') !== -1) {
        player = 'white'
    }

    // Log
    window.log(player + "," + type + "," + piece + ",," + source + "," + target)
    log_line_count += 1

    // Determine capture and log
    if ((piece.indexOf('w') !== -1 && oldPos[target] && oldPos[target].indexOf('b') !== -1) ||
        (piece.indexOf('b') !== -1 && oldPos[target] && oldPos[target].indexOf('w') !== -1)) {
        window.log(player + "," + "capture" + "," + piece + "," + oldPos[target] + "," + source + "," + target)
        log_line_count += 1
    }
    log_history.push(log_line_count)
    console.log(log_history)
}

function undo() {
    // Skip latest if it's the current
    if (state_history.length && board.fen() === state_history[state_history.length - 1]) {
        state_history.pop()
    }
    // If there is no history clear the board (it was a new game)
    var fen = "5/5/5/5/5"
    if (state_history.length) {
        fen = state_history[state_history.length - 1]
    }
    board.position(fen, false)

    // Clear logs
    var line_count = log_history.pop()
    window.undolog(line_count)
    console.log(log_history)
}

var config = {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true,
    onDrop: onDrop
}

var board = Chessboard('myBoard', config)
$(window).on('resize', board.resize)
$(window).on('keydown', function(e) {
    if (e.ctrlKey && e.key && e.key == "z") {
        undo()
    }
})


