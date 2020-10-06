const getTrack = require('../utils/getTrack')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').VoiceState} old
 * @param {import('discord.js').VoiceState} state
 */
async function onVoiceStateUpdate (client, old, state) {
  if (state.member.user.bot) return
  if (old.channelID === client.settings.target && state.channelID !== client.settings.target) {
    if (old.channel.members.array().filter((member) => !member.user.bot).length < 1) return client.lavalink.leave(old.guild.id)
  }

  if (old.channelID !== client.settings.target && state.channelID === client.settings.target) {
    const player = await client.lavalink.join({ guild: state.guild.id, channel: state.channelID, node: 'main' })
    player.play(await getTrack(client.lavalink.nodes.get('main'), client.settings.url))
  }
}

module.exports = onVoiceStateUpdate
