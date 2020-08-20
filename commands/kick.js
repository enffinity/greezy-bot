module.exports = {
    name: 'kick',
    execute(client, message, args) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            let user = message.mentions.users.first();
            if (!user) return message.channel.send('You did not mention someone!')
            user.kick();
            message.channel.send(`Successfully kicked ${user.tag}`);
        } else {
            return message.channel.send('You don\'t have permissions to use this!')
        }
    }
}
