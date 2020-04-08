var request = require('request');
var adfly = require("adf.ly")("21849101", "027e29a51c5882ec0708258001221225")
exports.run = (bot, msg, args) => {
    if (args[0] != undefined) {
        var link = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=" + args[0] + "&count=3&maxlength=300&format=json";
        var test = request(link, function (error, response, body) {
            var testing = JSON.parse(body); // Print the response status code if a response was received
            var link = ""
            if (testing.appnews != undefined) {
                console.log("News for " + args[0] + " gathered succesfully!");
                 adfly.short(testing.appnews.newsitems[0].url, function (url) {
                     console.log("Short URL is: " + url);
                     msg.channel.send("the latest news for this game is: " + testing.appnews.newsitems[0].title + " Read more information here: " + "<" + url + ">" + " Ignore all popups, click ignore on all browser pop-ups!")
                }) 

        
            } else {
                msg.channel.send("No game could be found with appid " + args[0] + ", please verify this is the correct number, or try a different one!")

            }
        })
    }
    msg.delete()
};

exports.help = {
    name: 'news',
    usage: 'news',
    description: 'Checks steam for news for the given Steam AppID, then returns the latest news available with a link to read more!'
};
