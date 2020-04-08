var request = require('request');
exports.run = (bot, msg, args) => {
    if (args[0] == undefined) {
        msg.channel.send('Missing Match id, Please include one to get match stats!')
        } else {
        console.log('Gosu link has been sent! ('+ args[0] + ')')
        msg.channel.send('https://gosu.ai/platform/dota/match/' + args[0] + '/5?utm_source=default&utm_medium=128953854&utm_campaign=UrlSharing')
    
    }
    msg.delete()
};

                        


                


exports.help = {
    name: 'gosu',
    usage: 'gosu [Match ID]',
    description: 'Returns a link for the user to get more information about the given match in dota 2'
};
