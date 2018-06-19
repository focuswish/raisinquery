const { stringify } = require('query-string')
const fetch = require('node-fetch')
const { log } = require('./util')
const dynamo = require('dynamodb-tools')({ prefix: 'stackerror-dev-' })

const createResponse = (message = {}) => ({
  statusCode: 200,
  body: JSON.stringify(message),
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

function getStats (fullName) {
  let [owner, repo] = fullName.split('/')
  let url = `https://api.github.com/repos/${owner}/${repo}?`
  url += stringify({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET
  })

  return fetch(url)
    .then(resp => resp.json())
    .then(d => ({
      stars: d.stargazers_count,
      forks: d.forks_count,
      watchers: d.watchers_count,
      language: d.language,
      repo: d.full_name
    })
  )
}

const handler = {
  repo: async ({ fullName }) => {
    let [repo] = await dynamo.database().get('repos', { fullName: fullName })

    let messages = await dynamo.database().get('messages', { repoId: repo.id })

    let stats = await getStats(repo.fullName)
    return {
      ...repo,
      ...stats,
      messages
    }
  },
  message: async ({ id }) => {
    let message = await dynamo.database().get('messages', { id: id })
    let repo = await dynamo.database().get('repos', { id: message.repoId })
    let messages = await dynamo.database().get('messages', { repoId: message.repoId })

    let stats = await getStats(repo.fullName)
    return Promise.resolve({
      ...message,
      repo: {
        ...repo,
        ...stats,
        messages
      }
    })
  },
  repos: () => {
    return dynamo.database().get('repos')
  }
}

function endpoint (name, shouldCache = true) {
  return async function (evt, ctx, cb) {
    let { queryStringParameters } = evt

    let data = {}
    try {
      data = await handler[name](queryStringParameters)
    } catch (error) {
      data = { error }
    }
    cb(null,
      createResponse(
        data
      )
    )
  }
}

exports.repo = endpoint('repo')
exports.repos = endpoint('repos')
exports.message = endpoint('message')

exports.log = async function (evt, ctx, cb) {
  let data = await log.get().text()
  data = data.split('\n')

  cb(null,
    createResponse(
      data
    )
  )
}
