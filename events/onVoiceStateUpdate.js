const getTrack = require('../utils/getTrack')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').VoiceState} old
 * @param {import('discord.js').VoiceState} state
 */
async function onVoiceStateUpdate (client, old = { channelID: '' }, state) {
  const channels = await client.db.select('*').from('channels')

  for (const channel of channels) {
    if (old.channelID === channel.id && state.channelID !== channel.id) {
      if (old.channel.members.array().filter((member) => !member.user.bot).length < 1) {
        client.lavalink.leave(old.guild.id)
        continue
      }
    }

    if (old.channelID !== channel.id && state.channelID === channel.id) {
      const { theme = 0 } = ((await client.db.select('theme').where('id', channel.id).from('channels'))[0] || {})
      const player = await client.lavalink.join({ guild: state.guild.id, channel: state.channelID, node: 'main' })
      player.play(await getTrack(client.lavalink.nodes.get('main'), client.settings.urls[theme].url)).catch(process.exit)
    }
  }

  if (!old.channel.members) return
  if (old.channel.members.filter((member) => !member.user.bot).size < 1) {
    client.lavalink.leave(old.guild.id)
  }
}

module.exports = onVoiceStateUpdate
