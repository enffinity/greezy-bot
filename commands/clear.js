module.exports = {
    name: 'clear',
    execute(client, message, args) {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            let amount = message.content.substring(7);
            if (!amount) return message.channel.send('You didn\'t put an amount!')
            if (amount > 100) return message.channel.send('You cannot clear more than 100 messages due to Discord API limitations!')
            try {
                message.channel.bulkDelete(amount)
                message.channel.send(`Successfully deleted ${amount} messages!`)
            } catch (err) {
                message.channel.send('You can\'t clear messages more than 14 days old due to Discord API limitations!');
            }
        } else {
            return message.channel.send('You don\'t have permissions to use this!')
        }
    }
}