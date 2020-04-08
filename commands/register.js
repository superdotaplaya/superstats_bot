var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyB5ydpjGQvdr9S5'
});
var base = Airtable.base('app2hzML7TQ4Y6szk');
exports.run = (bot, msg, args) => {
    if (args[0] != undefined && args[1] != undefined) {
    var filter = "{Name} = '" + msg.author.id + "'"
    console.log(msg.author.id)
    var user_record = ""
    
        base('Table 1').select({
            filterByFormula: filter
        }).firstPage(function (err, records) {
            if (err) { console.error(err); return; }
            records.forEach(function (record) {
                console.log('Retrieved', record.id);
                user_record = record.id;
            });
            if (user_record == "") {
                base('Table 1').create({
                    "Name": msg.author.id,
                    "SteamID64": args[0],
                    "SteamID3": args[1]
                }, function (err, record) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('New record Created! (' + msg.author.id + ")");
                    msg.channel.send("Thank you for sharing your steam IDs with the bot! you may now use all commands that require SteamID64 or SteamID3 elements without entering them each time across all servers I am active in!")
                });

            } else {
                base('Table 1').update(user_record, {
                    "Name": msg.author.id,
                    "SteamID64": args[0],
                    "SteamID3": args[1]
                }, function (err, record) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(record.get('Name'));
                    msg.channel.send("Your Steam Ids have succesfully been edited!")
                });

            }


        })
    } else {
        msg.channel.send("You did not supply your SteamID64 and SteamID3 Please be sure to use this format ```!register [SteamID64] [SteamID3 (everything after the 'U:1:')]```")

    }
};

exports.help = {
    name: 'register',
    usage: 'register [SteamId64] [SteamID3]',
    description: 'Adds your steam Ids to the bot system so stats can be obtained without entering this information across all servers! type !register-help for more information!'
};
