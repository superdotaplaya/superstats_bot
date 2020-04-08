var request = require('request');
var file = require('file-system');
var fs = require('fs');
exports.run = (bot, msg, args) => {
    fs.readFile("hero_list.json", function (error, content) {
        var data = JSON.parse(content);
        var filtered = data.filter(function (item) {
            return item.localized_name == args[0].toLowerCase();
        });
        if (filtered[0] != undefined) {
            var hero = filtered[0].id;
            var link = "https://api.opendota.com/api/rankings?hero_id=" + filtered[0].id;
            var test = request(link, function (error, response, body) {
                var testing = JSON.parse(body); // Print the response status code if a response was received
                console.log('someone checked the rankings for ' + args[0]); // Print the HTML for the Google homepage.
                msg.channel.send("The current top player on " + args[0] + " is " + testing.rankings[0].personaname + " Check out their games here: <https://www.opendota.com/players/" + testing.rankings[0].account_id + ">")
            })
        } else {
            msg.channel.send("No hero could be found, please ensure you entered in the hero's name correctly!")
        };

    });
    msg.delete()
};

exports.help = {
    name: 'dota-top-player',
    usage: 'dota-top-player [hero name]',
    description: 'Checks for the highest ranking player of the given hero and returns their name a link to their information on OpenDota.com'
};
