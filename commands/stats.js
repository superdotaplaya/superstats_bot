var request = require('request');
exports.run = (bot, msg, args) => {
    msg.channel.send("Thank you for using my bot! I am currently being used in " + bot.guilds.size + " servers")
    console.log('Someone checked how many servers I am active in!')
    msg.delete()
};







exports.help = {
    name: 'stats',
    usage: 'stats',
    description: 'Displays some stats about the bot'
};
