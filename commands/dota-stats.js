var request = require('request');
exports.run = (bot, msg, args) => {
    if (args[0] == undefined) {
        msg.channel.send('Please include a matchID for me to find for you!')

    } else {
        var test = request('https://www.opendota.com/api/matches/' + args[0], function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            var testing = JSON.parse(body); // Print the response status code if a response was received
            setTimeout(doSomething, 3000);

            function doSomething() {
                if (testing != undefined) {
                    console.log('match found successfully (' + args[0] + ')'); // Print the HTML for the Google homepage.
                    if (testing.radiant_win == true) {
                        var winner = "Radiant Victory"
                    } else {
                        var winner = "Dire Victory"
                    }
                    var kills = [testing.players[0].kills, testing.players[1].kills, testing.players[2].kills, testing.players[3].kills, testing.players[4].kills, testing.players[5].kills, testing.players[6].kills, testing.players[7].kills, testing.players[8].kills, testing.players[9].kills];
                    msg.channel.send("```Stats for your game are ready! Thanks to OpenDota's API! \n \n   " + winner + " \n \n   First Blood recorded after " + testing.first_blood_time + " seconds!\n \n   Radiant       " + testing.radiant_score + " \n \n     " +
                        testing.players[0].personaname + "  " + testing.players[0].kills + " / " + testing.players[0].deaths + " / " + testing.players[0].assists + "    GPM  " + testing.players[0].gold_per_min + "    XPM: " + testing.players[0].xp_per_min + "\n     " +
                        testing.players[1].personaname + "  " + testing.players[1].kills + " / " + testing.players[1].deaths + " / " + testing.players[1].assists + "    GPM  " + testing.players[1].gold_per_min + "    XPM:  " + testing.players[1].xp_per_min + "\n     " +
                        testing.players[2].personaname + "  " + testing.players[2].kills + " / " + testing.players[2].deaths + " / " + testing.players[2].assists + "    GPM  " + testing.players[2].gold_per_min + "    XPM:  " + testing.players[2].xp_per_min + "\n     " +
                        testing.players[3].personaname + "  " + testing.players[3].kills + " / " + testing.players[3].deaths + " / " + testing.players[3].assists + "    GPM  " + testing.players[3].gold_per_min + "    XPM:  " + testing.players[3].xp_per_min + "\n     " +
                        testing.players[4].personaname + "  " + testing.players[4].kills + " / " + testing.players[4].deaths + " / " + testing.players[4].assists + "    GPM  " + testing.players[4].gold_per_min + "    XPM:  " + testing.players[4].xp_per_min + "\n     " +
                        "\n   DIRE       " + testing.dire_score + " \n \n     " +
                        testing.players[5].personaname + "  " + testing.players[5].kills + " / " + testing.players[5].deaths + " / " + testing.players[5].assists + "    GPM  " + testing.players[5].gold_per_min + "    XPM:  " + testing.players[5].xp_per_min + "\n     " +
                        testing.players[6].personaname + "  " + testing.players[6].kills + " / " + testing.players[6].deaths + " / " + testing.players[6].assists + "    GPM  " + testing.players[6].gold_per_min + "    XPM:  " + testing.players[6].xp_per_min + "\n     " +
                        testing.players[7].personaname + "  " + testing.players[7].kills + " / " + testing.players[7].deaths + " / " + testing.players[7].assists + "    GPM  " + testing.players[7].gold_per_min + "    XPM:  " + testing.players[7].xp_per_min + "\n     " +
                        testing.players[8].personaname + "  " + testing.players[8].kills + " / " + testing.players[8].deaths + " / " + testing.players[8].assists + "    GPM  " + testing.players[8].gold_per_min + "    XPM:  " + testing.players[8].xp_per_min + "\n     " +
                        testing.players[9].personaname + "  " + testing.players[9].kills + " / " + testing.players[9].deaths + " / " + testing.players[9].assists + "    GPM  " + testing.players[9].gold_per_min + "    XPM:  " + testing.players[9].xp_per_min + "\n     " +
                        "\n```")

                } else {
                    msg.channel.send('The match could not be found, please ensure you included the correct match ID! if so, this may just be an error with the API, so please try again a few minutes!')

                }
            }
            })
            
        msg.delete()
        delete (testing)
    }
};

                        


                


exports.help = {
    name: 'dota-stats',
    usage: 'dota-stats',
    description: 'Get some statistics about the given dota 2 matchID'
};
