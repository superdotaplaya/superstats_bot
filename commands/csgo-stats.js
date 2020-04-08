var request = require('request');
const csgoStats = require('csgo-stats');
var Airtable = require('airtable');
var fs = require('fs');
var file = require('file-system');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyB5ydpjGQvdr9S5'
});
var base = Airtable.base('app2hzML7TQ4Y6szk');

exports.run = (bot, msg, args) => {
    if (args[0] == undefined) {
        var filter = "{Name} = '" + msg.author.id + "'"
        base('Table 1').select({
            filterByFormula: filter
        }).firstPage(function (err, records) {
            msg.channel.send("Searching for your information! If you still see this in a few moments please make sure you are registered! check out !register-help if you need assistance or have questions!").then(m => {
            if (err) { console.error(err); return; }
                records.forEach(function (record) {
                    console.log('Retrieved', record.id);
                    user_record = record.get("SteamID64");

                    csgoStats.load({
                        key: '25E4580A9474E305939291D9CC9EED7E',
                        id: user_record,
                    }).then(r => {
                        console.log(r.body.playerstats.stats)

                        msg.channel.send("``` CS:GO Player stats retrieved from csgo-stats.com! \n \n Total Kills:  " + r.body.playerstats.stats[0].value + "\n Total Deaths:  " + r.body.playerstats.stats[1].value + "\n Total wins:  " + r.body.playerstats.stats[5].value + "\n Total Knife Kills:  " + r.body.playerstats.stats[9].value + "\n Total Grenade Kills:  " + r.body.playerstats.stats[10].value + "\n Total Headshot Kills:  " + r.body.playerstats.stats[25].value + "\n Total AWP Kills:  " + r.body.playerstats.stats[19].value + "\n Total Scar Kills:  " + r.body.playerstats.stats[146].value + "\n Total Bombs Defused:  " + r.body.playerstats.stats[4].value + "\n Total Bombs Planted:  " + r.body.playerstats.stats[5].value + "```")
                        }).catch("profile is private or could not be found :cry:");
                    m.delete()
                })
                
            });
            })
        msg.delete()
    } else { 
        var user_record = args[0];
        csgoStats.load({
            key: '25E4580A9474E305939291D9CC9EED7E',
            id: user_record,
        }).then(r => {
            console.log(r.body.playerstats.stats)

            msg.channel.send("``` CS:GO Player stats retrieved from csgo-stats.com! \n \n Total Kills:  " + r.body.playerstats.stats[0].value + "\n Total Deaths:  " + r.body.playerstats.stats[1].value + "\n Total wins:  " + r.body.playerstats.stats[5].value + "\n Total Knife Kills:  " + r.body.playerstats.stats[9].value + "\n Total Grenade Kills:  " + r.body.playerstats.stats[10].value + "\n Total Headshot Kills:  " + r.body.playerstats.stats[25].value + "\n Total AWP Kills:  " + r.body.playerstats.stats[19].value + "\n Total Scar Kills:  " + r.body.playerstats.stats[146].value + "\n Total Bombs Defused:  " + r.body.playerstats.stats[4].value + "\n Total Bombs Planted:  " + r.body.playerstats.stats[5].value + "```")
            }).catch(e => msg.channel.send("profile is private or could not be found :cry:"));
        msg.delete()
    }
    
};


                        


                


exports.help = {
    name: 'csgo-stats',
    usage: 'csgo-stats',
    description: 'Get some statistics about the given players CS:GO stats!'
};
