const { MessageEmbed } = require('discord.js')

function fn (client, msg) {
  const embed = new MessageEmbed({
    title: 'click here to invite the bot',
    url: 'https://discord.com/api/oauth2/authorize?permissions=0&scope=bot&client_id=' + client.user.id,
    description: 'or [visit support server](https://discord.gg/VbcGYnv)'
  })
  msg.channel.send(embed)
}

module.exports = fn
module.exports.aliases = ['invite', 'support', '초대', '초대링크']
module.exports.description = 'show bot invite link & support server link'
