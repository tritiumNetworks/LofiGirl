/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function fn (client, msg) {
  if (!msg.member.hasPermission('MANAGE_CHANNELS')) return msg.channel.send('어라..? `' + msg.member.displayName + '`님은 채널을 설정할 권한이 없어요!\n이 명령을 사용하려면 사용자가 적어도 `채널 관리` 권한은 있어야 해요')
  if (!msg.member.voice.channel) return msg.channel.send('채널을 설정하려면 당연히 설정할 채널안에 있어야 해요')
  if (!msg.member.voice.channel.joinable || !msg.member.voice.channel.speakable) return msg.channel.send('아앗.. 제가 그 음성 채널에 들어갈 수 가 없어요..')

  const { theme = 0 } = ((await client.db.select('theme').where('id', msg.channel.id).from('channels'))[0] || {})

  await client.db.delete().where('guild', msg.guild.id).from('channels')
  await client.db.insert({ id: msg.member.voice.channel.id, guild: msg.guild.id, theme }).into('channels')
  msg.channel.send('`' + msg.member.voice.channel.name + '`에서 틀어드리는 걸로 설정했어요, `' + client.settings.prefix + 'play`로 바로 틀 수 있어요')
}

module.exports = fn
module.exports.aliases = ['mark', 'select', 'target', '채널', '채널설정', '항상재생']
module.exports.description = '항상 Lo-Fi를 틀어드릴 채널을 설정할 수 있어요'
