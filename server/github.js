const fetch = require('isomorphic-fetch')
const queryString = require('query-string')
const { stringify } = queryString

async function nodeFetch (url, params = {}) {
  let resp = await fetch(url, params)
  let json = await resp.json()
  return {
    ...json,
    headers: {
      rate_limit: resp.headers._headers['x-ratelimit-limit'][0],
      rate_limit_remaining: resp.headers._headers['x-ratelimit-remaining'][0],
      rate_limit_reset: resp.headers._headers['x-ratelimit-reset'][0]
    }
  }
}

function buildURI (params = {}, endpoint = null) {
  let baseUri = 'https://api.github.com'
  let str = queryString.stringify({
    ...params,
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET
  })
  let uri = `${baseUri}/${endpoint}?${str}`
  return uri
}

async function search ({ query, repo }) {
  let q = `&q=${encodeURIComponent(query)}+in:file+language:js+repo:${repo}`
  return fetch(
    'https://api.github.com/search/code' +
    stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET
    }) + `&q=${encodeURIComponent(query)}+in:file+language:js+repo:${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3.text-match+json'
      }
    })
  .then(resp => resp.json())
}

module.exports = { search, buildURI }
