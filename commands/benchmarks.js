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
            var link = "https://www.opendota.com/api/benchmarks?hero_id=" + filtered[0].id;
            var test = request(link, function (error, response, body) {
                var testing = JSON.parse(body); // Print the response status code if a response was received
                console.log('benchmarks found successfully (' + args[0] + ')'); // Print the HTML for the Google homepage.
                msg.channel.send("``` Hero benchmarks for " + args[0] + " According to OpenDota.com! \n \n" + "Percentile:          Results \n \n \n" +
                    testing.result.gold_per_min[0].percentile + "           " + "GPM " + testing.result.gold_per_min[0].value + "   XPM: " + testing.result.xp_per_min[0].value + "   LHPM: " + testing.result.last_hits_per_min[0].value + "\n" +
                    testing.result.gold_per_min[1].percentile + "           " + "GPM " + testing.result.gold_per_min[1].value + "   XPM: " + testing.result.xp_per_min[1].value + "   LHPM: " + testing.result.last_hits_per_min[1].value + "\n" +
                    testing.result.gold_per_min[2].percentile + "           " + "GPM " + testing.result.gold_per_min[2].value + "   XPM: " + testing.result.xp_per_min[2].value + "   LHPM: " + testing.result.last_hits_per_min[2].value + "\n" +
                    testing.result.gold_per_min[3].percentile + "           " + "GPM " + testing.result.gold_per_min[3].value + "   XPM: " + testing.result.xp_per_min[3].value + "   LHPM: " + testing.result.last_hits_per_min[3].value + "\n" +
                    testing.result.gold_per_min[4].percentile + "           " + "GPM " + testing.result.gold_per_min[4].value + "   XPM: " + testing.result.xp_per_min[4].value + "   LHPM: " + testing.result.last_hits_per_min[4].value + "\n" +
                    testing.result.gold_per_min[5].percentile + "           " + "GPM " + testing.result.gold_per_min[5].value + "   XPM: " + testing.result.xp_per_min[5].value + "   LHPM: " + testing.result.last_hits_per_min[5].value + "\n" +
                    testing.result.gold_per_min[6].percentile + "           " + "GPM " + testing.result.gold_per_min[6].value + "   XPM: " + testing.result.xp_per_min[6].value + "   LHPM: " + testing.result.last_hits_per_min[6].value + "\n" +
                    testing.result.gold_per_min[7].percentile + "           " + "GPM " + testing.result.gold_per_min[7].value + "   XPM: " + testing.result.xp_per_min[7].value + "   LHPM: " + testing.result.last_hits_per_min[7].value + "\n" +
                    testing.result.gold_per_min[8].percentile + "           " + "GPM " + testing.result.gold_per_min[8].value + "   XPM: " + testing.result.xp_per_min[8].value + "   LHPM: " + testing.result.last_hits_per_min[8].value + "\n" +
                    testing.result.gold_per_min[9].percentile + "           " + "GPM " + testing.result.gold_per_min[9].value + "   XPM: " + testing.result.xp_per_min[9].value + "   LHPM: " + testing.result.last_hits_per_min[9].value + "```")
            })
        } else {
           msg.channel.send("No hero could be found, please ensure you entered in the hero's name correctly!")
            console.log('No benchmarks could be found (' + args[0] + ')')
        }


    });
    msg.delete()
    delete(testing)
};







exports.help = {
    name: 'benchmarks',
    usage: 'benchmarks [hero name]',
    description: 'Grabs a list of benchmarks for the given hero from OpenDota!'
};
