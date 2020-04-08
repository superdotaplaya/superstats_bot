exports.run = (bot, msg, args) => {
    msg.channel.send('If you would like to support me as I develope my bot then feel free to leave a vote here to spread the word about the bot! https://discordbots.org/bot/579177822938202122/vote').then(m => {
        console.log('Someone got a link to vote for the bot!')
    });
    msg.delete()    
};

exports.help = {
    name: 'vote',
    usage: 'vote',
    description: 'Returns a link to vote for the bot on Discord Bot List!'
};
