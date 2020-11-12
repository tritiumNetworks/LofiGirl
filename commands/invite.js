const { MessageEmbed } = require('discord.js')

function fn (client, msg) {
  const embed = new MessageEmbed({
    title: '이곳을 눌러 ' + client.user.username + '를 초대해 보세요',
    url: 'https://discord.com/api/oauth2/authorize?permissions=0&scope=bot&client_id=' + client.user.id,
    description: '[지원 서버](https://discord.gg/VbcGYnv)도 있어요'
  })
  msg.channel.send(embed)
}

module.exports = fn
module.exports.aliases = ['invite', 'support', '초대', '초대링크']
module.exports.description = '봇 초대 링크와 지원 서버 링크를 보여줘요'
