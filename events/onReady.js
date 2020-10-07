const getTrack = require('../utils/getTrack')

/**
 * @param {import('../classes/Client')} client
 */
async function onReady (client) {
  console.log(
    client.user.username + ' is now online!\n' +
    'prefix: ' + client.settings.prefix
  )

  client.user.setActivity('Lo-fi | lf>help', { type: 'LISTENING' })

  const channels = await client.db.select('*').from('channels')
  for (const chn of channels) {
    const channel = client.channels.resolve(chn.id)
    const users = channel.members.array().filter((member) => !member.user.bot).length

    if (users < 1) return
    const player = await client.lavalink.join({ guild: channel.guild.id, channel: channel.id, node: 'main' })
    player.play(await getTrack(client.lavalink.nodes.get('main'), client.settings.url))
  }
}

module.exports = onReady
