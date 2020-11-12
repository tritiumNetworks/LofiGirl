const getTrack = require('../utils/getTrack')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  if (!msg.member.voice.channel) return msg.channel.send('어엇.. Lo-Fi를 트려면 채널에 있어야죠!')
  if (!msg.member.voice.channel.joinable || !msg.member.voice.channel.speakable) return msg.channel.send('아앗.. 제가 그 음성 채널에 들어갈 수 가 없어요..')

  const { theme = 0 } = ((await client.db.select('theme').where('id', msg.channel.id).from('channels'))[0] || {})

  await client.lavalink.leave(msg.guild.id)
  const player = await client.lavalink.join({ guild: msg.guild.id, channel: msg.member.voice.channelID, node: 'main' })
  player.play(await getTrack(client.lavalink.nodes.get('main'), client.settings.urls[theme].url)).catch(process.exit)
  msg.channel.send('틀었어요~ :tada:')
}

module.exports = fn
module.exports.aliases = ['play', 'join', '재생', '시작']
module.exports.description = 'Lo-Fi 스트림을 재생해줘요'
