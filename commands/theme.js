const { MessageEmbed } = require('discord.js')
const emojis = ['1%E2%83%A3', '2%E2%83%A3', '3%E2%83%A3', '4%E2%83%A3', '5%E2%83%A3', '6%E2%83%A3', '7%E2%83%A3', '8%E2%83%A3', '9%E2%83%A3']

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  const { urls } = client.settings
  const embed = new MessageEmbed({ title: 'there is ' + urls.length + ' theme(s)' })
  for (const index in urls) {
    embed.addField((Number(index) + 1) + '. ' + urls[index].name, '[' + urls[index].url + '](' + urls[index].url + ')')
  }

  const m = await msg.channel.send(embed)
  for (const index in urls) {
    await m.react(emojis[index])
  }

  const reactions = await m.awaitReactions((r, u) => emojis.includes(r.emoji.identifier) && urls[emojis.indexOf(r.emoji.identifier)] && u.id === msg.author.id, { time: 10000, max: 1 })
  if (!reactions.first()) return m.edit('selection timeout', { embed: null })
  m.reactions.removeAll().catch(() => {})

  m.edit('you choose `' + urls[emojis.indexOf(reactions.first().emoji.identifier)].name + '` theme', { embed: null })
}

module.exports = fn
module.exports.aliases = ['theme', '테마', '테마설정']
module.exports.description = 'change lofi theme'
