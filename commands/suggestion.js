var request = require('request');
exports.run = (bot, msg, args) => {
    bot.channels.get('590285041649844225').send("User @<" + msg.author.id + "> sent some feedback: " + msg.content.replace('!suggestion ', ''))
    msg.channel.send("Thanks for submitting your ideas and/or feedback! I will look into what you have sent! If you would like to know if what you have requested was added try out the !updates command to see whats new!")
    console.log("Feedback has been recieved!")
    msg.delete()
};

                        


                


exports.help = {
    name: 'suggestion',
    usage: 'suggestion',
    description: 'Returns a link for the user to get more information about the given match in dota 2'
};
