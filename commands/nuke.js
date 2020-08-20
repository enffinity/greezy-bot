module.exports = {
    name: 'nuke',
    execute(client, message, args) {
        if (message.member.hasPermission(["MANAGE_CHANNELS", "MANAGE_MESSAGES"])) {
            try {
                message.channel.bulkDelete('100');
                let m = await message.channel.send('Successfully nuked this channel!')
                setTimeout(function () {
                    m.delete();
                }, 1200)
            } catch (err) {
                message.channel.send('There seems to be messages older than 14 days old in this channel so i can\'t delete them due to Discord API limitations');
            }
        } else {
            return message.channel.send('You don\'t have permissions to use this command!')
        }
    }
}