const { get } = require('superagent')
const cache = {}

/**
 * @param {import('lavacord').LavalinkNode} node
 * @param {string} search
 */
async function getSongs (node, search) {
  if (!cache[search]) {
    const params = new URLSearchParams()
    params.append('identifier', search)
    const res =
      await get('http://' + node.host + ':' + node.port + '/loadtracks?' + params)
        .set('Authorization', node.password)

    cache[search] = res.body
    return res.body
  } else return cache[search]
}

module.exports = getSongs
