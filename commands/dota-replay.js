var request = require('request');
exports.run = (bot, msg, args) => {
    var link = 'https://api.opendota.com/api/replays?match_id=' + args[0];
    var test = request(link, function (error, response, body) {
        var testing = JSON.parse(body); // Print the response status code if a response was received
        if (testing[0] != undefined) {
            console.log("Download this matches replay here: http://replay" + testing[0].cluster + ".valve.net/570/" + testing[0].match_id + "_" + testing[0].replay_salt + ".dem.bz2"); // Print the HTML for the Google homepage.
            msg.channel.send("Download this matches replay here: http://replay" + testing[0].cluster + ".valve.net/570/" + testing[0].match_id + "_" + testing[0].replay_salt + ".dem.bz2")
        } else {
            msg.channel.send("No match could be found, this could result if you have the incorrect matchID or the match has not been analyzed by OpenDota yet, please try again later!")
               }
    });
    msg.delete()
};







exports.help = {
    name: 'dota-replay',
    usage: 'dota-replay [Match ID]',
    description: 'Returns a link for the player to download a replay for the given dota 2 match!'
};
