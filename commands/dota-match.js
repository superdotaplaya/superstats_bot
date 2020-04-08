var request = require('request');
exports.run = (bot, msg, args) => {
    if (args[0] == undefined) {
        msg.channel.send('Missing Match id, Please include one to get match stats!')
        } else {

        msg.channel.send('https://www.opendota.com/matches/' + args[0])
    console.log('OpenDota link generated for match: ' + args[0])
    }
    msg.delete()
};

                        


                


exports.help = {
    name: 'dota-match',
    usage: 'dota-match',
    description: 'Returns a link for the user to get more information about the given match in dota 2'
};
