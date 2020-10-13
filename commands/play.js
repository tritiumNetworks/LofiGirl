const getTrack = require('../utils/getTrack')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  if (!msg.member.voice.channel) return msg.channel.send('you need to join a voice channel first')
  if (!msg.member.voice.channel.joinable || !msg.member.voice.channel.speakable) return msg.channel.send('sorry, i don\'t have any permissions to connect that channel')

  const { theme = 0 } = ((await client.db.select('theme').where('id', msg.channel.id).from('channels'))[0] || {})

  await client.lavalink.leave(msg.guild.id)
  const player = await client.lavalink.join({ guild: msg.guild.id, channel: msg.member.voice.channelID, node: 'main' })
  player.play(await getTrack(client.lavalink.nodes.get('main'), client.settings.urls[theme].url)).catch(process.exit)
}

module.exports = fn
module.exports.aliases = ['play', 'join', '재생', '시작']
module.exports.description = 'join & play lofi live stream'
