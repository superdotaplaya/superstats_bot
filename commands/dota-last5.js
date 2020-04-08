var request = require('request');
var Airtable = require('airtable');
var base = Airtable.base('app2hzML7TQ4Y6szk');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyB5ydpjGQvdr9S5'
});
exports.run = (bot, msg, args) => {
    var filter = "{Name} = '" + msg.author.id + "'"
    if (args[0] != undefined) {
        var link = "https://api.opendota.com/api/players/" + args[0] + "/matches";
        var test = request(link, function (error, response, body) {
            var testing = JSON.parse(body); // Print the response status code if a response was received
            if (testing != undefined) {
                console.log("Someone checked someone elses most recent 5 games!");
                msg.channel.send("```Match history for the given player: \n \n     Match ID: " + testing[0].match_id + "   KDA: " + testing[0].kills + "/" + testing[0].deaths + "/" + testing[0].assists +
                    "\n      Match ID: " + testing[1].match_id + "   KDA: " + testing[1].kills + "/" + testing[1].deaths + "/" + testing[1].assists +
                    "\n      Match ID: " + testing[2].match_id + "   KDA: " + testing[2].kills + "/" + testing[2].deaths + "/" + testing[2].assists +
                    "\n      Match ID: " + testing[3].match_id + "   KDA: " + testing[3].kills + "/" + testing[3].deaths + "/" + testing[3].assists +
                    "\n      Match ID: " + testing[4].match_id + "   KDA: " + testing[4].kills + "/" + testing[4].deaths + "/" + testing[4].assists + "```"
                )
            } else {
                msg.channel.send("No account could be found, please be sure to include the proper steamID3!")
                console.log('A user could not be found to find thier most recent 5 games!')
            }
        })
    } else {
        var SteamID3_user = ""
        base('Table 1').select({
            filterByFormula: filter
        }).firstPage(function (err, records) {
            if (err) { console.error(err); return; }
            records.forEach(function (record) {
                console.log('Retrieved', record.fields.SteamID3);
                user_record = record.id;
                SteamID3_user = record.fields.SteamID3;
            });
            if (SteamID3_user == "") {


            }
            var link = "https://api.opendota.com/api/players/" + SteamID3_user +"/matches";
            var test = request(link, function (error, response, body) {
                var testing = JSON.parse(body); // Print the response status code if a response was received
                if (testing[1] != undefined) {
                    console.log("Someone checked their own most recent 5 games!");
                    msg.channel.send("```Match history for the given player: \n \n      Match ID: " + testing[0].match_id + "   KDA: " + testing[0].kills + "/" + testing[0].deaths + "/" + testing[0].assists +
                        "\n      Match ID: " + testing[1].match_id + "   KDA: " + testing[1].kills + "/" + testing[1].deaths + "/" + testing[1].assists +
                        "\n      Match ID: " + testing[2].match_id + "   KDA: " + testing[2].kills + "/" + testing[2].deaths + "/" + testing[2].assists +
                        "\n      Match ID: " + testing[3].match_id + "   KDA: " + testing[3].kills + "/" + testing[3].deaths + "/" + testing[3].assists +
                        "\n      Match ID: " + testing[4].match_id + "   KDA: " + testing[4].kills + "/" + testing[4].deaths + "/" + testing[4].assists + "```"
                        )
                } else {
                    msg.channel.send("No account could be found, please be sure to include the proper steamID 64")
                    console.log('A user could not be found to find thier most recent 5 games!')
                }
            })
        });
    }
    msg.delete()
};

exports.help = {
    name: 'dota-last5',
    usage: 'dota-last5 [SteamID3 (the number after U:1:)]',
    description: 'Returns Stats and match IDs of the given players last 5 matches!'
};
