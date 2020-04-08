var request = require('request');
exports.run = (bot, msg, args) => {
    if (msg.author.id == '117099961291636739') {
        var messaged_user = args[0]
        bot.users.get(messaged_user).send(msg.content.replace("!respond " + args[0] , ""));
    }

};

exports.help = {
    name: 'respond',
    usage: 'respond',
    description: 'Responds to a users feedback or issue with or about the bot!'
};
