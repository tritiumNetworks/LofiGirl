const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  let embed = new MessageEmbed({
    title: 'Lofi Girl',
    description: 'Discord bot that just playing ChilledCow\'s live stream'
  })
    .setImage('https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg')
    .setFooter('* Illustration by Juan Pablo Machado (https://bit.ly/Machadofb)')

  const m = await msg.channel.send('push the red button for next page', embed)

  m.react(':red_button:763195646911840296')

  await m.awaitReactions((r, u) => r.emoji.id === '763195646911840296' && u.id === msg.author.id, { max: 1 })
  m.reactions.removeAll().catch(() => {})

  const fields = []
  for (const command of client.commands) {
    const { aliases, description: value = 'none' } = command

    if (!aliases) continue

    const name = aliases.reduce((acc, alias) => acc + '`' + client.settings.prefix + alias + '` ', '')
    fields.push({ name, value })
  }

  embed = new MessageEmbed({ fields })
    .setAuthor('Lofi Girl - Commands', 'https://cdn.discordapp.com/avatars/763033945767280650/f28f0969527e600a8a2c16fae84f8ce3.webp')
    .setThumbnail('https://media.discordapp.net/attachments/708927519973441556/763208406047129631/994BB93F5AD305BF02.png')

  m.edit('', embed)
}

module.exports = fn
module.exports.aliases = ['help', '도움', '도움말', '명령어']
module.exports.description = 'Show this message'
