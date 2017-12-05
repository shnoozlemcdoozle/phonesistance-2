var express = require('express'),
    server = express();

var cards5 = ['spy!', 'spy!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!'],
    cards6 = ['spy!', 'spy!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!'],
    cards7 = ['spy!', 'spy!', 'spy!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!'],
    cards8 = ['spy!', 'spy!', 'spy!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!'],
    cards9 = ['spy!', 'spy!', 'spy!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!'],
    cards10 = ['spy!', 'spy!', 'spy!', 'spy!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!', 'part of the resistance!']


var pickedDeck = 0;
var playersInGame = [];
var teamVoteApprove = 0;
var teamVoteVeto = 0;
var teamVoteResponses = 0;
var missionVotePass = 0;
var missionVoteFail = 0;
var missionVoteResponses = 0;
var playersInMissionVote = 0;
var boxColor1 = 0;
var boxColor2 = 0;
var boxColor3 = 0;
var boxColor4 = 0;
var boxColor5 = 0;


function shuffleDeck(deck) {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}

shuffleDeck(pickedDeck);
// Loading the file index.html displayed to the client

var port = process.env.PORT || 8080;

server.use(express.static(__dirname + '/public'));

// Loading socket.io
var io = require('socket.io').listen(server.listen(port));

io.sockets.on('connection', function (socket) {

    socket.emit('connectionUser');

    socket.on('userConnected', function (username) {
        playersInGame.push(username);
        socket.username = username;
        socket.broadcast.emit('playersInGameUpdate', playersInGame);
        socket.emit('playersInGameUpdate', playersInGame);
        console.log(playersInGame);
    });

    socket.on('disconnect', function () {
        console.log(socket.username + " disconnected");
        var index = playersInGame.indexOf(socket.username);
        playersInGame.splice(index, 1);
        console.log(playersInGame);
        socket.broadcast.emit('playersInGameUpdate', playersInGame);
        socket.emit('playersInGameUpdate', playersInGame);
    })

    socket.on('startGame', function (numberOfPlayers) {
        socket.emit('showTeamButton');
        socket.broadcast.emit('showTeamButton');
        if (numberOfPlayers == 5) {
            pickedDeck = 0;
            pickedDeck = cards5;
            shuffleDeck(pickedDeck);
            console.log('Players set to 5');
        } else if (numberOfPlayers == 6) {
            pickedDeck = 0;
            pickedDeck = cards6;
            shuffleDeck(pickedDeck);
            console.log('Players set to 6');
        } else if (numberOfPlayers == 7) {
            pickedDeck = 0;
            pickedDeck = cards7;
            shuffleDeck(pickedDeck);
            console.log('Players set to 7');
        } else if (numberOfPlayers == 8) {
            pickedDeck = 0;
            pickedDeck = cards8;
            shuffleDeck(pickedDeck);
            console.log('Players set to 8');
        } else if (numberOfPlayers == 9) {
            pickedDeck = 0;
            pickedDeck = cards9;
            shuffleDeck(pickedDeck);
            console.log('Players set to 9');
        } else if (numberOfPlayers == 10) {
            pickedDeck = 0;
            pickedDeck = cards10;
            shuffleDeck(pickedDeck);
            console.log('Players set to 10');
        }
    })

    socket.on('teamRequest', function () {

        var chosenCard = pickedDeck.shift();

        socket.emit('teamCard', chosenCard);
    });



});