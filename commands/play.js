const getTrack = require('../utils/getTrack')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  if (!msg.member.voice.channel) return msg.channel.send('you need to join the voice channel first')
  await client.lavalink.leave(msg.guild.id)
  const player = await client.lavalink.join({ guild: msg.guild.id, channel: msg.member.voice.channelID, node: 'main' })
  player.play(await getTrack(client.lavalink.nodes.get('main'), client.settings.url))
}

module.exports = fn
module.exports.aliases = ['play', 'join', '재생', '시작']
module.exports.description = 'Join & play lofi live stream'
