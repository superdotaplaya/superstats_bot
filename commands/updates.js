var request = require('request');
exports.run = (bot, msg, args) => {
    msg.channel.send("```The most recent update was on July 6th, 2019 at 2:08 PM EST \n \n Added 1 new command! \n \n This new command is !dot4 \n \n It will give you a link to download a currently in developement custom gamemode for dota 2 called dot4 (dota 2 but theres 4 teams!) This is a project my friends, my brother and I have been working on for quite some time, its playable, but we are looking to get full games going to help speed up the process of squashing bugs! Theres a link to the discord we use for running tests in the description of the custom game!```")
    console.log('Patchnotes have been sent to a user!')
    msg.delete()
};

exports.help = {
    name: 'updates',
    usage: 'updates',
    description: 'Returns the most recent patch notes for SuperStats bot! Better to be in the know!'
};
