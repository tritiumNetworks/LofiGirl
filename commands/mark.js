/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  if (!msg.member.hasPermission('MANAGE_CHANNELS')) return msg.channel.send('you don\'t have permission to do this action.\nyou need `manage_channels` permission')
  if (!msg.member.voice.channel) return msg.channel.send('you need to join a voice channel first')
  if (!msg.member.voice.channel.joinable || !msg.member.voice.channel.speakable) return msg.channel.send('sorry, i don\'t have any permissions to connect that channel')

  await client.db.delete().where('guild', msg.guild.id).from('channels')
  await client.db.insert({ id: msg.member.voice.channel.id, guild: msg.guild.id }).into('channels')
  msg.channel.send('done. Use `' + client.settings.prefix + 'play` to start playing')
}

module.exports = fn
module.exports.aliases = ['mark', 'target', '채널', '채널설정', '항상재생']
module.exports.description = 'Mark the channel that always playing lofi'
