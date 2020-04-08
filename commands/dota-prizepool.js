var request = require('request');
exports.run = (bot, msg, args) => {
    var link = 'https://www.dota2.com/webapi/IDOTA2League/GetPrizePool/v0001/?league_id=10749';
    var test = request(link, function (error, response, body) {

        var testing = JSON.parse(body); // Print the response status code if a response was received
        msg.channel.send("The current prizepool for The DotA 2 International 2019 is: $" + testing.prize_pool.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        console.log('Dota 2 prizepool has been succesfully found!')
    });
    msg.delete()
    delete (testing)

};







exports.help = {
    name: 'dota-prizepool',
    usage: 'dota-prizepool',
    description: 'Returns the prize pool for the current international for DotA 2!'
};
