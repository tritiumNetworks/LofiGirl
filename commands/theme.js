const { MessageEmbed } = require('discord.js')
const getTrack = require('../utils/getTrack')
const emojis = ['1%E2%83%A3', '2%E2%83%A3', '3%E2%83%A3', '4%E2%83%A3', '5%E2%83%A3', '6%E2%83%A3', '7%E2%83%A3', '8%E2%83%A3', '9%E2%83%A3']

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  const { urls } = client.settings
  const embed = new MessageEmbed({ title: urls.length + '개의 테마를 찾았어요' })
  for (const index in urls) {
    embed.addField((Number(index) + 1) + '. ' + urls[index].name, '[' + urls[index].url + '](' + urls[index].url + ')')
  }

  const m = await msg.channel.send(embed)
  for (const index in urls) {
    await m.react(emojis[index])
  }

  const reactions = await m.awaitReactions((r, u) => emojis.includes(r.emoji.identifier) && urls[emojis.indexOf(r.emoji.identifier)] && u.id === msg.author.id, { time: 10000, max: 1 })
  if (!reactions.first()) return m.edit('앗, 선택 시간이 지났어요', { embed: null })
  m.reactions.removeAll().catch(() => {})

  const theme = emojis.indexOf(reactions.first().emoji.identifier)

  await client.db.update({ theme }).where('guild', msg.guild.id).from('channels')
  m.edit('`' + urls[emojis.indexOf(reactions.first().emoji.identifier)].name + '`로 테마를 설정했어요', { embed: null })

  if (client.lavalink.players.get(msg.guild.id)) {
    await client.lavalink.leave(msg.guild.id)
    const player = await client.lavalink.join({ guild: msg.guild.id, channel: msg.guild.voice.channel.id, node: 'main' })
    player.play(await getTrack(client.lavalink.nodes.get('main'), client.settings.urls[theme].url)).catch(process.exit)
  }
}

module.exports = fn
module.exports.aliases = ['theme', '테마', '테마설정']
module.exports.description = '틀어드릴 Lo-Fi 테마를 바꿀 수 있어요'
