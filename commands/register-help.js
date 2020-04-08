exports.run = (bot, msg, args) => {
    msg.channel.send("In order to access many parts of many games and websites related to steams API A SteamID64 or SteamID3 is required, to save you from having to find this everytime you want to use a command I have offered the !register command as a way to get around this. This information is not accessible by users (SteamID64 and SteamID3 can be found on many sites by anyone anyway). This is not required to use any commands, but by providing this information you will not need to type out this information in any server I am currently active in ever again. If you would like to find a friends stats you can still use the command by adding in their SteamID64 or SteamID3! If you have any other questions please join the support server for the bot here to speak with me directly <https://discord.gg/4dMA8A7> :smile: \n \n Command Usage: ```!register [SteamID64] [SteamID3 (everything inside of brackets after U:1:1)]```")

};

exports.help = {
    name: 'register-help',
    usage: 'register-help [SteamID64] [SteamID3 (everything inside of brackets after U:1:1)',
    description: 'Gives a bunch more info and background to the use of the register command!'
};
