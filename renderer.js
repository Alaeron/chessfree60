// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

function onDrop(source, target, piece, newPos, oldPos, orientation) {
    // Determine move type
    var type = "move"
    if (source == "spare") {
        type = "summon"
    }

    // Determine player
    player = 'black'
    if (piece.indexOf('w') !== -1) {
        player = 'white'
    }

    // Log
    window.log(player + "," + type + "," + piece + ",," + source + "," + target)

    // Determine capture
    if ((piece.indexOf('w') !== -1 && oldPos[target] && oldPos[target].indexOf('b') !== -1) ||
        (piece.indexOf('b') !== -1 && oldPos[target] && oldPos[target].indexOf('w') !== -1)) {
        window.log(player + "," + "capture" + "," + piece + "," + oldPos[target] + "," + source + "," + target)
    }
}

var config = {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true,
    onDrop: onDrop
}

var board = Chessboard('myBoard', config)
$(window).on('resize', board.resize)


