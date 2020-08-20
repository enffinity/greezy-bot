module.exports = {
    name: 'ban',
    execute(client, message, args) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            let user = message.mentions.users.first();
            if (!user) return message.channel.send('You did not mention someone!')
            user.ban();
            message.channel.send(`Successfully banned ${user.tag}`);
        } else {
            return message.channel.send('You don\'t have permissions to use this!')
        }
    }
}