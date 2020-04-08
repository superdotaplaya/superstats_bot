const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {
    if (message.author.id == "117099961291636739"){
    console.log('A user requested a list of all available functions!')
    message.channel.send("I am attempting to send you a list of commands, if you do not recieve them shortly please check your settings and make sure I am able to dm you (check to make sure dms from people who share a server is allowed")
    fs.readdir("./commands/", (err, files) => {
        if (err) console.error(err);

        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) {
            console.log("No commands to load!");
            return;
        }

        var namelist = "";
        var desclist = "";
        var usage = "";

        let result = jsfiles.forEach((f, i) => {
            let props = require(`./${f}`);
            namelist = props.help.name;
            desclist = props.help.description;
            usage = props.help.usage;

            // send help text
            message.author.send(`**${namelist}** \n${desclist} \n${usage}`);
        });
    })
    message.delete()
}
}

module.exports.help = {
    name: "help",
    description: "show all commands",
    usage: ""
}
