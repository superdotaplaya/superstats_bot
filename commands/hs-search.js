var request = require('request');
var unirest = require('unirest');
const fs = require('fs');
const download = require('download');
exports.run = (bot, msg, args) => {
    unirest.get("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/" + msg.content.replace("!hs-search ", ""))
        .header("X-RapidAPI-Host", "omgvamp-hearthstone-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "fa56bb5a79msh032c0f74cb37508p19cc16jsnbf9b100c0d23")
        .end(function (result) {
            console.log(result.status, result.headers, result.body);
            if (result.body.error == "404") {
                msg.channel.send("No card could be found matching that search, please try a new search!")
                return;
            }
            var total = result.body.length - 2;
            if (result.body[total].img == undefined) {

                msg.channel.send("I was not able to find an image for this card, please try using a different search")
                return;
            }
            msg.channel.send("I have found this card as a result of your search!", {
                file: JSON.stringify(result.body[total].img).replace('"', '').replace('"', '') // Or replace with FileOptions object
            });
        })

};







exports.help = {
    name: 'hs-search',
    usage: 'hs-search [Name or partial name of card (returns first result)]',
    description: 'Returns the first Hearthstone card found matching the entered name!'
};
