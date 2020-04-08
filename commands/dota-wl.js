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
        var link = "https://api.opendota.com/api/players/" + args[0] + "/wl";
        var test = request(link, function (error, response, body) {
            var testing = JSON.parse(body); // Print the response status code if a response was received
           
            if (testing.win != undefined) {
                console.log("This player currently has " + testing.win + " wins, and " + testing.lose + " losses!");
                msg.channel.send("This player currently has " + testing.win + " wins, and " + testing.lose + " losses!")
            } else {
                msg.channel.send("Please Include A SteamID3 or supply your information via the !register command! For more help on how this command works please type !register-help")
                console.log('A user could not be found to check wins and losses!')
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
            var link = "https://api.opendota.com/api/players/" + SteamID3_user + "/wl";
            var test = request(link, function (error, response, body) {
                var testing = JSON.parse(body); // Print the response status code if a response was received
                if (testing != undefined) {
                    console.log("This player currently has " + testing.win + " wins, and " + testing.lose + " losses!");
                    msg.channel.send("This player currently has " + testing.win + " wins, and " + testing.lose + " losses!")
                } else {
                    msg.channel.send("No account could be found, please be sure to include the proper steamID 64")
                    console.log('A user could not be found to check wins and losses!')
                }
            })
        });
    }
    msg.delete()
};

exports.help = {
    name: 'dota-wl',
    usage: 'dota-wl [SteamID3 (the number after U:1:)]',
    description: 'Returns the players total wins and losses!'
};
