const { get } = require('superagent')
const Query = require('../classes/Query')
const cache = []

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function onMessage (client, msg) {
  const { prefix } = client.settings
  const { author, content } = msg

  if (!msg.guild) return msg.channel.send('아앗.. DM은 안받아요ㅠ')
  if (author.bot) return
  if (!content.startsWith(prefix)) return

  const query = new Query(prefix, content)
  const target = client.commands.find(
    (command = { aliases: [] }) =>
      typeof command === 'function' &&
      command.aliases.includes(query.cmd)
  )

  if (!target) return
  if ((client.settings.koreanbots || {}).enable) {
    if (!cache.includes(msg.author.id)) {
      const { status, body } =
        await get(client.settings.koreanbots.baseURL + '/bots/voted/' + msg.author.id)
          .set('token', client.settings.koreanbots.token)
          .catch(console.log)

      if (status !== 200) target(client, msg)
      else if (body.voted) {
        cache.push(msg.author.id)
        target(client, msg)
      } else {
        msg.channel.send('헤잉.. 죄송하지만 하트 버튼 하나만 딱 눌러주시면 안될까요...\n' + client.settings.koreanbots.profileURL)
      }
    } else target(client, msg)
  } else target(client, msg)
}

module.exports = onMessage
