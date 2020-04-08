var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyB5ydpjGQvdr9S5'
});
var base = Airtable.base('app2hzML7TQ4Y6szk');

exports.run = (bot, msg, args) => {
    console.log(msg.author.id)
    if (msg.attachments.first() != undefined) {
        base('Memes').create({
            "Name": msg.content.replace('!memedb ', ''),
            "Meme": msg.attachments.first().proxyURL,
        }, function (err, record) {
            if (err) {
                msg.channel.send("I ran in to an issue submitting your meme :( Please try again at a later time!")
                console.error(err);
                return;
            }
            console.log('New Meme Added! (' + msg.content.replace('!memedb ', '') + ")");
            msg.channel.send("Your meme has been added to the Database! Use the command !memedb-search " + msg.content.replace('!memedb ', ''))
            msg.react("🤣")
        });
    } else {
        msg.channel.send("You forgot the most important part of this command! Your meme! Please try again (with your cand AND meme this time) :smile:")

    }
                      };

exports.help = {
    name: 'memedb',
    usage: '!memedb [Meme caption] [Meme image]',
    description: 'Adds your steam Ids to the bot system so stats can be obtained without entering this information across all servers! type !register-help for more information!'
};
