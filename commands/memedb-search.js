var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyB5ydpjGQvdr9S5'
});
var base = Airtable.base('app2hzML7TQ4Y6szk');
exports.run = (bot, msg, args) => {
    if (args[0] != undefined) {
        var filter = "{Name} = '" + msg.content.replace('!memedb-search ', '') + "'"
        console.log(filter)
    console.log(msg.author.id)
    var user_record = ""
    
        base('Memes').select({
            filterByFormula: filter
        }).firstPage(function (err, records) {
            if (err) { console.error(err); return; }
            
            records.forEach(function (record) {
                console.log('Retrieved', record.id);
                msg.channel.send("Your meme has been found! \n \n \n" + record.get("Name") + " " + record.get('Meme'))
                user_record = record.id;
            });
            
        })
    } else {
        msg.channel.send("No meme could be found with that caption, Please add it to the database, or ensure you typed it correctly!")

    }
    msg.delete()
};

exports.help = {
    name: 'memedb-search',
    usage: 'memedb-search [caption]',
    description: 'Searches the meme database from SuperStats to find a meme that was submitted with a given caption!'
};
