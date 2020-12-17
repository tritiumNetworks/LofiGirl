const { post } = require('superagent')
const getTrack = require('../utils/getTrack')

/**
 * @param {import('../classes/Client')} client
 */
async function onReady (client) {
  console.log(
    client.user.username + ' is now online!\n' +
    'prefix: ' + client.settings.prefix
  )

  client.user.setActivity('Lo-fi | ' + client.settings.prefix + 'help', { type: 'LISTENING' })

  const channels = await client.db.select('*').from('channels')
  for (const chn of channels) {
    const channel = client.channels.resolve(chn.id)
    if (!channel) continue

    const users = channel.members.array().filter((member) => !member.user.bot).length

    if (users < 1) {
      await client.lavalink.leave(channel.guild.id)
      continue
    }

    const player = await client.lavalink.join({ guild: channel.guild.id, channel: channel.id, node: 'main' })
    player.play(await getTrack(client.lavalink.nodes.get('main'), client.settings.urls[chn.theme || 0].url)).catch(process.exit)
  }

  const channels2 = client.channels.cache.array().filter((ch) => ch.type === 'voice' && ch.members.find((member) => member.user.id === client.user.id))
  for (const chn of channels2) {
    const channel = client.channels.resolve(chn.id)
    if (!channel) continue

    const users = channel.members.array().filter((member) => !member.user.bot).length

    if (users < 1) {
      await client.lavalink.leave(channel.guild.id)
      continue
    }

    const player = await client.lavalink.join({ guild: channel.guild.id, channel: channel.id, node: 'main' })
    player.play(await getTrack(client.lavalink.nodes.get('main'), client.settings.urls[chn.theme || 0].url)).catch(process.exit)
  }

  if ((client.settings.koreanbots || {}).enable) {
    setInterval(async () => {
      await post(client.settings.koreanbots.baseURL + '/bots/servers')
        .set('token', client.settings.koreanbots.token)
        .send({ servers: client.guilds.cache.size })
        .catch(console.log)
    }, 300000)
  }

  if ((client.settings.uniquebots || {}).enable) {
    setInterval(async () => {
      await post(client.settings.uniquebots.baseURL + '/graphql')
        .set('authorization', 'Bearer ' + client.settings.uniquebots.token)
        .send({
          query: 'query($guilds: Int!) {botAccount {guilds(patch: $guilds)}}',
          variables: { guilds: client.guilds.cache.size }
        }).catch(console.log)
    }, 300000)
  }
}

module.exports = onReady
