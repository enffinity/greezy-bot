module.exports = {
    name: 'ping',
    execute(client, message, args) {
        let m = message.channel.send('Pinging... :ping_pong:')
        message.channel.send(`Pong! Took ${client.ws.ping} to receive your message!`)
    }
}