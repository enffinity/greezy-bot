const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;

client.login(config.token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async(message) => {
    if(message.author.bot || !message.content.startsWith(prefix)) return;
    const command = message.content.startsWith(prefix);

    if(message.content.startsWith(`${prefix}ping`)) {
        let m = await message.channel.send('Pinging... :ping_pong:')
        let ping = m.createdTimestamp - message.createdTimestamp;
        message.channel.send(`Pong! Took ${ping} to receive your message!`)
    } else if (message.content.startsWith(`${prefix}kick`)) {
        if(message.member.hasPermission("KICK_MEMBERS")) {
            let user = message.mentions.users.first();
            if(!user) return message.channel.send('You did not mention someone!')
            user.kick();
            message.channel.send(`Successfully kicked ${user.tag}`);
        } else {
            return message.channel.send('You don\'t have permissions to use this!')
        }
    } else if (message.content.startsWith(`${prefix}ban`)) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            let user = message.mentions.users.first();
            if (!user) return message.channel.send('You did not mention someone!')
            user.ban();
            message.channel.send(`Successfully banned ${user.tag}`);
        } else {
            return message.channel.send('You don\'t have permissions to use this!')
        }
    } else if (message.content.startsWith(`${prefix}clear`)) {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            let amount = message.content.substring(7);
            if(!amount) return message.channel.send('You didn\'t put an amount!')
            if(amount > 100) return message.channel.send('You cannot clear more than 100 messages due to Discord API limitations!')
            try {
                message.channel.bulkDelete(amount)
                message.channel.send(`Successfully deleted ${amount} messages!`)
            } catch(err) {
                message.channel.send('You can\'t clear messages more than 14 days old due to Discord API limitations!');
            }
        } else {
            return message.channel.send('You don\'t have permissions to use this!')
        }
    } else if (message.content.startsWith(`${prefix}nuke`)) {
        if(message.member.hasPermission(["MANAGE_CHANNELS", "MANAGE_MESSAGES"])) {
            try {
                message.channel.bulkDelete('100');
                let m = await message.channel.send('Successfully nuked this channel!')
                setTimeout(function() {
                    m.delete();
                }, 1200)
            } catch (err) {
                message.channel.send('There seems to be messages older than 14 days old in this channel so i can\'t delete them due to Discord API limitations');
            }
        } else {
            return message.channel.send('You don\'t have permissions to use this command!')
        }
    }
})
