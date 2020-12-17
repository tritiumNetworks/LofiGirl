const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  let embed = new MessageEmbed({
    title: 'Lofi Girl',
    description: 'a discord bot just playing ChilledCow\'s live stream\n- developed by `Dev. PMH#7086`'
  })
    .setImage('https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg')
    .setFooter('* illustration by Juan Pablo Machado (http://jpmachado.art)')

  const m = await msg.channel.send('<:red_button:763195646911840296>를 눌러 다음으로 넘어갈 수 있어요', embed)

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
    .setAuthor('Lofi Girl - commands', 'https://cdn.discordapp.com/avatars/763033945767280650/f28f0969527e600a8a2c16fae84f8ce3.webp')
    .setThumbnail('https://media.discordapp.net/attachments/708927519973441556/763208406047129631/994BB93F5AD305BF02.png')
    .setImage('https://cdn.discordapp.com/attachments/530043751901429762/769515579274035240/Peek_2020-10-24_20-00.gif')

  m.edit('', embed)
}

module.exports = fn
module.exports.aliases = ['help', '도움', '도움말', '명령어']
module.exports.description = '이 도움말 창을 보여줘요'
