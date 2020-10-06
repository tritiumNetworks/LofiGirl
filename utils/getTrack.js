const { get } = require('superagent')
let cache

/**
 * @param {import('lavacord').LavalinkNode} node
 * @param {string} search
 */
async function getSongs (node, search) {
  const params = new URLSearchParams()
  params.append('identifier', search)
  const res =
    await get('http://' + node.host + ':' + node.port + '/loadtracks?' + params)
      .set('Authorization', node.password)

  return res.body
}

module.exports = async (node, url) => {
  if (!cache) {
    cache = (await getSongs(node, url)).tracks[0].track
    setTimeout(() => {
      cache = undefined
    }, 600000)
  }

  return cache
}
