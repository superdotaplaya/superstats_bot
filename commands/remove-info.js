var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyB5ydpjGQvdr9S5'
});
var base = Airtable.base('app2hzML7TQ4Y6szk');
exports.run = (bot, msg, args) => {

    var filter = "{Name} = '" + msg.author.id + "'"
    console.log(msg.author.id)
    var user_record = ""
    
        base('Table 1').select({
            filterByFormula: filter
        }).firstPage(function (err, records) {
            if (err) { console.error(err); return; }
            records.forEach(function (record) {
                console.log('Retrieved', record.id);
                user_record = record.id;
            });
            if (user_record == "") {
                msg.channel.send("I do not currently have any info about your account, there is nothing for me to remove!")

            } else {
                base('Table 1').destroy(user_record, function (err, deletedRecord) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Deleted record', deletedRecord.id);
                    msg.channel.send("Your information has been deleted! If you decide you want to add it back at a later time just use the !register command again :)")
                });

            }


            })
    msg.delete()
    }


exports.help = {
    name: 'remove-info',
    usage: '!remove-info',
    description: 'Removes all saved information about your discord account from the bot!'
};
