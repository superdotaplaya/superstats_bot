var request = require('request');
exports.run = (bot, msg, args) => {
    var match_id = args[0]
    request.post("https://api.opendota.com/api/request/" + match_id, function (error, repsonse, body) {
        var testing = JSON.parse(body);
        console.log(testing)

        if (args[0] == undefined) {
            msg.channel.send("No match could be found, please try again later, or ensure you are using the correct matchID!")
            console.log('A match with that ID could not be parsed (' + args[0] + ')')
        } else {
            msg.channel.send("Match has been submitted for parsing on OpenDota.com! This could take a few minutes!")
        }
    })
    msg.delete()
};

                        


                


exports.help = {
    name: 'dota-parse',
    usage: 'dota-parse',
    description: 'Submits a parse request to OpenDota.com to parse your dota match for more stats!'
};
