var request = require('request');
var unirest = require('unirest');
exports.run = (bot, msg, args) => {
    if (args[0] != undefined || args[1] != undefined) {
        unirest.get("https://coingecko.p.rapidapi.com/simple/price?include_24hr_change=true&ids=" + args[0] + "&vs_currencies=" + args[1])
            .header("X-RapidAPI-Host", "coingecko.p.rapidapi.com")
            .header("X-RapidAPI-Key", "fa56bb5a79msh032c0f74cb37508p19cc16jsnbf9b100c0d23")
            .end(function (result) {
                console.log(result.status, result.headers, result.body);
                var info = JSON.stringify(result.body)
                if (result.body.error == "404") {
                    msg.channel.send("I could not find any information about that currency, please try a different one!")
                    
                    return;
                } else if (info.length != "2") {
                    msg.channel.send("```Current price for " + args[0] + " in " + args[1] + "! \n \n" + JSON.stringify(result.body).replace('"', '').replace('"', '').replace('{', ' ').replace('}', '').replace(',', '     ').replace(args[0], "").replace(':', "    ").replace('{', " ").replace('}', " ") + "```")

                } else {
                    msg.channel.send("I was not able to find any price information for the currency you are searching for, make sure you use the full name and no abbreviations for the crypto and the abbreviation for the FIAT currency!")
                }
            });

    } else {
        msg.channel.send("Please include a crypto-currency and FIAT currency to convert to and to search for!")

    }
    msg.delete()
};

exports.help = {
    name: 'crypto-price',
    usage: '!crypto-price [Crytpo name] [Fiat currency abbreviation]',
    description: 'Returns the current price and 24 hour change in the searched for Cryptocurrency!'
};
