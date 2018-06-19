require('dotenv').config()
const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const queryString = require('query-string')
const github = require('./github')
const fetch = require('isomorphic-fetch')

async function init () {
  await app.prepare()
  const server = express()
  server.get('/favicon.ico', (req, res) => {
    res.status(204)
  })

  server.get('/api/repo/:owner/:repo', async (req, res) => {
    let {owner, repo} = req.params

    let url = github.buildURI({}, `repos/${owner}/${repo}`)
    let data = await fetch(url)
      .then(resp => resp.json())
      .then(d => ({
        stars: d.stargazers_count,
        forks: d.forks_count,
        watchers: d.watchers_count,
        language: d.language,
        repo: d.full_name
      }))
    res.json(data)
  })

  server.get('/api/issues/:repo', async (req, res) => {
    let { repo } = req.params
    let { q } = req.query

    let url = `https://api.github.com/search/issues?q=${q}+repo:${repo}&per_page=5`
    let resp = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3.text-match+json'
      }
    })
    let json = await resp.json()

    res.json(json.items || [])
  })

  server.get('/api/questions/:repo', async (req, res) => {
    let json
    let { repo } = req.params
    let { q } = req.query
    let url = `https://api.stackexchange.com/2.2/search/advanced?`

    url += queryString.stringify({
      key: process.env.SE_CLIENT_KEY,
      site: 'stackoverflow',
      order: 'desc',
      sort: 'relevance',
      filter: '!9YdnSIN*P',
      unsafe: true,
      pagesize: 5,
      q: `${repo} ${q}`
    })

    json = await fetch(url)
      .then(resp => resp.json())

    res.json(json.items || [])
  })

  server.get('/repos/:user/:name', (req, res) => {
    return app.render(req, res, '/repo', req.params)
  })

  server.get('/:messageId', async (req, res) => {
    let url = process.env.AWS_LAMBDA_ENDPOINT + 'message?id='
    url += req.params.messageId
    let resp = await fetch(url)
      .then(resp => resp.json())

    res.redirect(`/${req.params.messageId}/${resp.slug}`)
  })

  server.get('/:messageId/:slug', (req, res) => {
    return app.render(req, res, '/page', req.params)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}

init()
