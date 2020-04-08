var request = require('request');
exports.run = (bot, msg, args) => {
    if (args[0] != undefined) {
        var link = "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=" + args[0] + "&count=3&maxlength=300&format=json";
        var test = request(link, function (error, response, body) {
            var testing = JSON.parse(body); // Print the response status code if a response was received
            if (testing == undefined) {
                msg.channel.send("No player stats could be found, please try again later or ensure you used the proper appID for the game you are looking for!")
            } else {
                msg.channel.send("There is currently " + testing.response.player_count + " players playing that game on Steam!")
                console.log('Player cout found successfully! (' + args[0] + ')')
            }

        });
    }
    msg.delete()
};







exports.help = {
    name: 'player-count',
    usage: 'playercount [Steam appID',
    description: 'Returns how many people are currently playing a game (steam players only)'
};
