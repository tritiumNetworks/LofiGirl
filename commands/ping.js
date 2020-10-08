function fn (client, msg) {
  msg.channel.send(
    'pong! ' + client.ws.ping + 'ms'
  )
}

module.exports = fn
module.exports.aliases = ['ping', '핑', 'pong']
module.exports.description = 'check discord latency'
