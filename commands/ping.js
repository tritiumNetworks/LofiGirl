function fn (client, msg) {
  msg.channel.send(
    'pong! ' + client.ws.ping + 'ms'
  )
}

module.exports = fn
module.exports.aliases = ['ping', '핑', 'pong']
module.exports.description = '응답시간을 측정해줘요'
