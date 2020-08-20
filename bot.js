//Imports
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const prefix = config.prefix;

//Client
client.login(config.token);
client.commands = new Discord.Collection();

// Command Handler
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Events
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async(message) => {
    if(message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.get(command)) return;
    if(client.commands.get(command)) client.commands.get(command).execute(client, message, args);
})

//Logging
client.on('messageDelete', message => {
    if (!message.partial) {
        const channel = client.channels.cache.get(config.logging_channel_id);
        if (channel) {
            const embed = new Discord.MessageEmbed()
                .setTitle('Deleted Message')
                .addField('Author', `${message.author.tag} (${message.author.id})`, true)
                .addField('Channel', `${message.channel.name} (${message.channel.id})`, true)
                .setDescription(message.content)
                .setTimestamp();
            channel.send(embed);
        }
    }
});
client.on('guildBanAdd', (guild, user) => {
    const channel = client.channels.cache.get(config.logging_channel_id);
    if(channel) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Member Banned')
            .addField('Member Tag', user.tag)
            .addField('Member Id', user.id)

        channel.send(embed)
    }
})
client.on('guildMemberRemove', (guild, user) => {
    const channel = client.channels.cache.get(config.logging_channel_id);
    if (channel) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Member Left')
            .addField('Member Tag', user.tag)
            .addField('Member Id', user.id)

        channel.send(embed)
    }
})
client.on('guildBanRemove', (guild, user) => {
    const channel = client.channels.cache.get(config.logging_channel_id);
    if (channel) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Member Unbanned')
            .addField('Member Tag', user.tag)
            .addField('Member Id', user.id)

        channel.send(embed)
    }
})

client.on('warn', console.warn);
client.on('error', console.error);
