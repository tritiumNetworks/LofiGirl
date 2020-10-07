/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  if (!msg.member.voice.channel) return msg.channel.send('you need to join the voice channel first')
  await client.db.delete().where('guild', msg.guild.id).from('channels')
  await client.db.insert({ id: msg.member.voice.channel.id, guild: msg.guild.id }).into('channels')
  msg.channel.send('done. Use `' + client.settings.prefix + 'play` to start playing')
}

module.exports = fn
module.exports.aliases = ['mark', 'target', '채널', '채널설정', '항상재생']
module.exports.description = 'Mark the channel that always playing lofi'
