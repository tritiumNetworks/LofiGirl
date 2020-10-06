const { resolve: path } = require('path')
const { Client } = require('discord.js')
const { existsSync } = require('fs')
const { readRecursively } = require('../utils/readFiles')
const { Manager } = require('@lavacord/discord.js')

class eClient extends Client {
  constructor () {
    super()
    this.tt = {}

    this.tt.settingPath = path() + '/config.json'
    this.tt.settingHas = existsSync(this.tt.settingPath)

    if (this.tt.settingHas) {
      const {
        token = process.env.TOKEN,
        prefix = (process.env.PREFIX || 'lofi '),
        ...settings
      } = require(this.tt.settingPath)

      if (!token) throw new Error('Token not provided')
      this.settings = { token, prefix, ...settings }
    } else throw new Error('./config.json not exists')

    this.tt.commandsPath = path() + '/commands'
    this.tt.commandsHas = existsSync(this.tt.commandsPath)

    if (this.tt.commandsHas) {
      this.commands = []
      readRecursively(this.tt.commandsPath)
        .forEach((command) => {
          if (!command.endsWith('.js')) return

          command = require(command)
          this.commands.push(command)
        })
    } else throw new Error('./commands/ folder not exists')

    this.lavalink = new Manager(this, [{ id: 'main', host: 'localhost', port: 2334, password: 'youshallnotpass' }])
    this.on('ready', async () => await this.lavalink.connect())
  }

  start (token = this.settings.token) {
    this.login(token)
  }

  regist (event = 'ready', exec = () => {}) {
    this.on(event, (...args) => {
      exec(this, ...args)
    })
  }
}

module.exports = eClient
