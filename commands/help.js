const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {
    message.author.send("To see a full list of commands and how they work please go here: <http://evassmat.com/Yv2W>")
}

module.exports.help = {
    name: "help",
    description: "show all commands",
    usage: ""
}
