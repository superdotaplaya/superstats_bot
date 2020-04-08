var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var request = require('request');
var file = require('file-system');  
var fs = require('fs');
var parser = require('json-parser');
var forEach = require("for-each");
const download = require('download');
const random = require('random')
const DBL = require("dblapi.js");
var htmlParser = require('html-parser');
var strip = require('strip-html');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.setPresence({
        game: {
            name: 'Stat Collection Simulator'
        },
        status: 'online'
    });
    console.log(bot.servers)
    
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`

    var ServerID = bot.channels[channelID].guild_id;
    var user_points = {
        username: userID,
        points: 1,
    };

    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];



        args = args.splice(1);
        switch (cmd) {
            // !ping

            case 'help':
                bot.setPresence({
                    game: {
                        name: 'Teacher'
                    },
                    status: 'online'
                });
                bot.sendMessage({
                    to: channelID,
                    message: "```Thanks for using my bot! The follwoing commands are currently working, more will be added in the future! \n \n !help -- The command you are currently reading :P \n \n !dotamach [Match ID] -- Gives the user a link to find more information about their match from OpenDota.com \n \n !dota-stats [Match ID] -- Shows some quick stats about the provided match ID \n \n !gosu [Match ID] -- Gives the user a link to read about Gosu.AI's analysis about the given match \n \n !cod [platform] [username] -- Brings up a link to the provided accounts Call of Duty stats \n \n !benchmarks [hero (heroes with spaces should be in this format 'winter-wyvern'] -- Displays some basic benchmarking stats about the given hero \n \n !dota-top-player [hero] -- Brings up the top ranked player on the given hero along with a link to that players profile on OpenDota.com \n \n !dota-replay [Match ID] -- Provides a link to download the given match \n \n !dota-parse [Match ID] -- Will submit the match to be parsed by OpenDota```"
                });
                break;
            case 'ping':

                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });

                break;
            case 'dotamatch':
                bot.setPresence({
                    game: {
                        name: 'Dota Stat Analyzer'
                    },
                    status: 'online'
                });
                //fs.writeFile('test.txt', message, function(err) { } )
                if (args[0] == undefined) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Missing Match id, Please include one to get match stats!'

                    }
                    )

                } else {
                    bot.sendMessage({

                        to: channelID,
                        message: 'https://www.opendota.com/matches/' + args[0]

                    });
                }
                break;
            case 'gosu':
                bot.sendMessage({

                    to: channelID,
                    message: 'Check out your analysis here! (you may need to click on your hero as it may start on a random players analysis!) <https://gosu.ai/platform/dota/match/' + args[0] + '/8?utm_source=default&utm_medium=128953854&utm_campaign=UrlSharin0g>'
                });
                break;
            case 'cod':
                bot.sendMessage({
                    to: channelID,
                    message: 'Go here to view your ' + args[0] + ' Call of Duty stats: https://cod.tracker.gg/bo4/profile/' + args[0] + '/' + args[1]
                });
                break;
            case 'lol':
                if (args[0] == 'register') {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Go here to sign up to get stats for your League of Legends gameplay! <https://mobalytics.gg/>'
                    })
                }
                // Handles if the player uses !lol stats
                if (args[0] == 'stats') {
                    // Checks to make sure the user puts in a valid region to retrieve stats as well as making sure they input a username (this username may not exist, but will not throw an error!)
                    if (args[1] != 'na' || args[1] == 'euw' || args[1] == 'eune' || args[1] == 'br' || args[1] == 'jp' || args[1] == 'kr' || args[1] == 'lan' || args[1] == 'las' || args[1] == 'oce' || args[1] == 'ru' || args[1] == 'tr' || args[2] == null) {
                        bot.sendMessage({
                            to: channelID,
                            message: 'The proper usage for this command is as follows ```!lol stats [region abbreviated] [username]```'
                        })
                    }
                    // if everything the user puts in is valid and correct it will give them the link using the code below!
                    else {
                        bot.sendMessage({
                            to: channelID,
                            message: 'Go here to view you League of Legends gameplay stats! <https://lol.mobalytics.gg/summoner/' + args[1] + '/' + args[2] + '>'
                        })
                    }
                };
                break;
            // Just add any case commands if you want to..
            case 'ow':
                if (args[0] == 'stats') {
                    if (args[1] == null || args[2] == null) {
                        bot.sendMessage({
                            to: channelID,
                            message: 'Proper usage of this command is as follows ```!ow stats [battlenet user name (CASE SENSITIVE)] [#number without #]```'
                        })

                    } else {
                        bot.sendMessage({
                            to: channelID,
                            message: 'Go here to view your Overwatch gameplay stats! <https://www.overbuff.com/players/pc/' + args[1] + '-' + args[2] + '>'
                        })

                    }

                };
                break;
            case 'csgo':
                if (args[0] == 'stats') {
                    if (args[1] == null) {
                        bot.sendMessage({
                            to: channelID,
                            message: "please include your Steam username!"

                        })

                    } else {
                        bot.sendMessage({
                            to: channelID,
                            message: "Go here to see your CS:GO Stats! <https://csgo-stats.com/player/" + args[1] + '>'

                        })
                    }

                };
                break;

            // Gets basic stats about a given match! (usernames, K/D/A, GPM, XPM:)
            case 'dota-stats':
                if (args[0] == undefined) {
                    bot.sendMessage({
                        to: channelID,
                        message: "No match found, please make sure you include the match ID so I can find your stats!"
                    })

                } else {
                    var test = request('https://www.opendota.com/api/matches/' + args[0], function (error, response, body) {
                        console.log('error:', error); // Print the error if one occurred
                        var testing = JSON.parse(body); // Print the response status code if a response was received
                        if (testing.match_id != undefined) {
                            console.log('match found successfully'); // Print the HTML for the Google homepage.

                            var kills = [testing.players[0].kills, testing.players[1].kills, testing.players[2].kills, testing.players[3].kills, testing.players[4].kills, testing.players[5].kills, testing.players[6].kills, testing.players[7].kills, testing.players[8].kills, testing.players[9].kills];
                            kills.forEach(function (element) {
                                console.log(element);
                            });
                            bot.sendMessage({
                                to: channelID,
                                message: "```Stats for your game are ready! Thanks to OpenDota's API! \n \n" + "Radiant \n \n" +
                                    testing.players[0].personaname + "  " + testing.players[0].kills + " / " + testing.players[0].deaths + " / " + testing.players[0].assists + "    GPM  " + testing.players[0].gold_per_min + "    XPM: " + testing.players[0].xp_per_min + "\n" +
                                    testing.players[1].personaname + "  " + testing.players[1].kills + " / " + testing.players[1].deaths + " / " + testing.players[1].assists + "    GPM  " + testing.players[1].gold_per_min + "    XPM:  " + testing.players[1].xp_per_min + "\n" +
                                    testing.players[2].personaname + "  " + testing.players[2].kills + " / " + testing.players[2].deaths + " / " + testing.players[2].assists + "    GPM  " + testing.players[2].gold_per_min + "    XPM:  " + testing.players[2].xp_per_min + "\n" +
                                    testing.players[3].personaname + "  " + testing.players[3].kills + " / " + testing.players[3].deaths + " / " + testing.players[3].assists + "    GPM  " + testing.players[3].gold_per_min + "    XPM:  " + testing.players[3].xp_per_min + "\n" +
                                    testing.players[4].personaname + "  " + testing.players[4].kills + " / " + testing.players[4].deaths + " / " + testing.players[4].assists + "    GPM  " + testing.players[4].gold_per_min + "    XPM:  " + testing.players[4].xp_per_min + "\n" +
                                    "\n DIRE \n \n" +
                                    testing.players[5].personaname + "  " + testing.players[5].kills + " / " + testing.players[5].deaths + " / " + testing.players[5].assists + "    GPM  " + testing.players[5].gold_per_min + "    XPM:  " + testing.players[5].xp_per_min + "\n" +
                                    testing.players[6].personaname + "  " + testing.players[6].kills + " / " + testing.players[6].deaths + " / " + testing.players[6].assists + "    GPM  " + testing.players[6].gold_per_min + "    XPM:  " + testing.players[6].xp_per_min + "\n" +
                                    testing.players[7].personaname + "  " + testing.players[7].kills + " / " + testing.players[7].deaths + " / " + testing.players[7].assists + "    GPM  " + testing.players[7].gold_per_min + "    XPM:  " + testing.players[7].xp_per_min + "\n" +
                                    testing.players[8].personaname + "  " + testing.players[8].kills + " / " + testing.players[8].deaths + " / " + testing.players[8].assists + "    GPM  " + testing.players[8].gold_per_min + "    XPM:  " + testing.players[8].xp_per_min + "\n" +
                                    testing.players[9].personaname + "  " + testing.players[9].kills + " / " + testing.players[9].deaths + " / " + testing.players[9].assists + "    GPM  " + testing.players[9].gold_per_min + "    XPM:  " + testing.players[9].xp_per_min + "\n" +
                                    "\n``` "

                            });
                        } else {
                            bot.sendMessage({
                                to: channelID,
                                message: "No match could be found, this could result if you have the incorrect matchID or the match has not been analyzed by OpenDota yet, please try again later!"

                            })

                        }
                    });
                    break;
                };

            case 'benchmarks':
                console.log("someone on server:" + ServerID + "has checked the benchmarks for " + args[0])
                fs.readFile("hero_list.json", function (error, content) {
                    var data = JSON.parse(content);
                    var filtered = data.filter(function (item) {
                        return item.localized_name == args[0].toLowerCase();
                    });
                    if (filtered[0] != undefined) {
                        console.log(filtered[0].id);
                        var link = "https://www.opendota.com/api/benchmarks?hero_id=" + filtered[0].id;
                        var test = request(link, function (error, response, body) {
                            var testing = JSON.parse(body); // Print the response status code if a response was received
                            console.log('benchmarks found successfully'); // Print the HTML for the Google homepage.
                            bot.sendMessage({
                                to: channelID,
                                message: "``` Hero benchmarks for " + args[0] + " According to OpenDota.com! \n \n" + "Percentile:          Results \n \n \n" +
                                    testing.result.gold_per_min[0].percentile + "           " + "GPM " + testing.result.gold_per_min[0].value + "   XPM: " + testing.result.xp_per_min[0].value + "   LHPM: " + testing.result.last_hits_per_min[0].value + "\n" +
                                    testing.result.gold_per_min[1].percentile + "           " + "GPM " + testing.result.gold_per_min[1].value + "   XPM: " + testing.result.xp_per_min[1].value + "   LHPM: " + testing.result.last_hits_per_min[1].value + "\n" +
                                    testing.result.gold_per_min[2].percentile + "           " + "GPM " + testing.result.gold_per_min[2].value + "   XPM: " + testing.result.xp_per_min[2].value + "   LHPM: " + testing.result.last_hits_per_min[2].value + "\n" +
                                    testing.result.gold_per_min[3].percentile + "           " + "GPM " + testing.result.gold_per_min[3].value + "   XPM: " + testing.result.xp_per_min[3].value + "   LHPM: " + testing.result.last_hits_per_min[3].value + "\n" +
                                    testing.result.gold_per_min[4].percentile + "           " + "GPM " + testing.result.gold_per_min[4].value + "   XPM: " + testing.result.xp_per_min[4].value + "   LHPM: " + testing.result.last_hits_per_min[4].value + "\n" +
                                    testing.result.gold_per_min[5].percentile + "           " + "GPM " + testing.result.gold_per_min[5].value + "   XPM: " + testing.result.xp_per_min[5].value + "   LHPM: " + testing.result.last_hits_per_min[5].value + "\n" +
                                    testing.result.gold_per_min[6].percentile + "           " + "GPM " + testing.result.gold_per_min[6].value + "   XPM: " + testing.result.xp_per_min[6].value + "   LHPM: " + testing.result.last_hits_per_min[6].value + "\n" +
                                    testing.result.gold_per_min[7].percentile + "           " + "GPM " + testing.result.gold_per_min[7].value + "   XPM: " + testing.result.xp_per_min[7].value + "   LHPM: " + testing.result.last_hits_per_min[7].value + "\n" +
                                    testing.result.gold_per_min[8].percentile + "           " + "GPM " + testing.result.gold_per_min[8].value + "   XPM: " + testing.result.xp_per_min[8].value + "   LHPM: " + testing.result.last_hits_per_min[8].value + "\n" +
                                    testing.result.gold_per_min[9].percentile + "           " + "GPM " + testing.result.gold_per_min[9].value + "   XPM: " + testing.result.xp_per_min[9].value + "   LHPM: " + testing.result.last_hits_per_min[9].value + "```"



                            })
                        });
                    } else {
                        bot.sendMessage({
                            to: channelID,
                            message: "No hero could be found, please ensure you entered in the hero's name correctly!"
                        });
                    }


                });
                break;
            case 'dota-top-player':
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
                            bot.sendMessage({
                                to: channelID,
                                message: "The current top player on " + args[0] + " is " + testing.rankings[0].personaname + " Check out their games here: <https://www.opendota.com/players/" + testing.rankings[0].account_id + ">"
                            });

                        })
                    } else {
                        bot.sendMessage({
                            to: channelID,
                            message: "No hero could be found, please ensure you entered in the hero's name correctly!"
                        })

                    };

                });

                break;

            case 'dota-replay':
                var link = 'https://api.opendota.com/api/replays?match_id=' + args[0];
                var test = request(link, function (error, response, body) {
                    var testing = JSON.parse(body); // Print the response status code if a response was received
                    if (testing[0] != undefined) {
                        console.log("Download this matches replay here: http://replay" + testing[0].cluster + ".valve.net/570/" + testing[0].match_id + "_" + testing[0].replay_salt + ".dem.bz2"); // Print the HTML for the Google homepage.
                        bot.sendMessage({
                            to: channelID,
                            message: "Download this matches replay here: http://replay" + testing[0].cluster + ".valve.net/570/" + testing[0].match_id + "_" + testing[0].replay_salt + ".dem.bz2"
                        })
                    } else {
                        bot.sendMessage({
                            to: channelID,
                            message: "No match could be found, this could result if you have the incorrect matchID or the match has not been analyzed by OpenDota yet, please try again later!"
                        })
                    }

                });
                break;

            case 'dota-parse':
                bot.setPresence({
                    game: {
                        name: 'personal parsing assistant'
                    },
                    status: 'online'
                })
                var match_id = args[0]
                request.post("https://api.opendota.com/api/request/" + match_id, function (error, repsonse, body) {
                    var testing = JSON.parse(body);
                    console.log(testing)
                });
                bot.sendMessage({
                    to: channelID,
                    message: "Match has been submitted for parsing on OpenDota.com! This could take a few minutes!"
                })
                break;

            case "news":
                bot.setPresence({
                    game: {
                        name: 'News Broadcaster'
                    },
                    status: 'online'
                })
                if (args[0] != undefined) {
                    var link = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=" + args[0] + "&count=3&maxlength=300&format=json";
                    var test = request(link, function (error, response, body) {
                        var testing = JSON.parse(body); // Print the response status code if a response was received
                        if (testing.appnews != undefined) {
                            console.log("News for " + args[0] + " gathered succesfully!");
                            bot.sendMessage({
                                to: channelID,
                                message: "the latest news for this game is: " + testing.appnews.newsitems[0].title + " Read more information here: " + testing.appnews.newsitems[0].url
                            })
                        } else {
                            bot.sendMessage({

                                to: channelID,
                                message: "No game could be found with appid " + args[0] + ", please verify this is the correct number, or try a different one!"
                            })

                        }
                    })
                }
                break;

            case "player-count":
                if (args[0] != undefined) {
                    var link = "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=" + args[0] + "&count=3&maxlength=300&format=json";
                    var test = request(link, function (error, response, body) {
                        var testing = JSON.parse(body); // Print the response status code if a response was received
                        if (testing == undefined) {
                            bot.sendMessage({
                                to: channelID,
                                message: "No player stats could be found, please try again later or ensure you used the proper appID for the game you are looking for!"
                            })



                        } else {
                            bot.sendMessage({
                                to: channelID,
                                message: "There is currently " + testing.response.player_count + " players playing that game currently!"
                            })
                        }

                    });
                }                    
                           


        }
    }
});