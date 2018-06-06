const get = require('lodash.get')
const empty = require('lodash.isempty')
// const yale = require('yale')
const fetch = require('node-fetch')
const { stringify } = require('query-string')
const {
  log,
  nodeFetch,
  getCodeSegment,
  getState,
  setState,
  slugify,
  generatePostId,
  terms,
  blacklist,
  db,
  clean,
  now
} = require('./util')
const parser = require('./parser')
// const cache = new yale.Adapter(process.env.REDIS_URL)
const btoa = require('btoa')
const atob = require('atob')

class Handler {
  constructor (state) {
    this.state = state
  }

  async getRepos () {
    console.log('getRepos()')
    let { page, index } = this.state.repos

    let url = 'https://api.github.com/search/repositories?' + stringify({
      q: 'stars:>=1000',
      language: 'js',
      sort: 'stars',
      order: 'desc',
      page: page
    })
    console.log(url)
    let items = await fetch(url)
      .then(resp => resp.json())
      .then(json => json.items.filter(repo =>
        blacklist.indexOf(repo.name.toLowerCase()) < 0
      ))

    if (index >= (items.length - 1)) {
      this.state.repos.page++
      this.state.repos.index = 0
      await setState(this.state)

      return this.getRepos()
    }

    return items[index]
  }

  createSnippets () {
    console.log('createSnippets()')

    let text = this.matches[0].text

    return atob(this.content).split('\n').reduce((acc, val, i, arr) => {
      if (val.indexOf(text) < 0) return acc
      let parsed = parser(arr.slice(i, i + 5))
      if (!parsed) return acc

      let { lines, startIndex } = getCodeSegment(i, arr)
      let slug = slugify(parsed.message)

      if (slug && slug.length > 5) {
        acc.push({
          ...parsed,
          ...clean(parsed.fragments),
          index: i,
          startIndex,
          code: btoa(lines.join('\n')),
          message: btoa(parsed.message),
          slug: slugify(parsed.message)
        })
      }

      return acc
    }, [])
  }

  async search () {
    this.query = terms[this.state.terms.index]
    console.log(this.query)
    let repo = await this.getRepos()
    console.log(repo.full_name)
    let url = 'https://api.github.com/search/code?'
    url += `&q=${encodeURIComponent(this.query)}+in:file+language:js+repo:${repo.full_name}`

    console.log('search()', url)
    // stringify({
    //  client_id: process.env.GITHUB_CLIENT_ID,
    //  client_secret: process.env.GITHUB_CLIENT_SECRET,
    // }) + `&q=${encodeURIComponent(this.query)}+in:file+language:js+repo:${repo.full_name}`

    return fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3.text-match+json'
      }
    }).then(resp => resp.json())
  }

  setRepo () {
    console.log('setRepo()')

    let { result } = this
    return db.database().set('repos', {
      name: result.repository.name,
      fullName: result.repository.full_name,
      id: '' + result.repository.id,
      avatarUrl: result.repository.owner.avatar_url,
      htmlUrl: result.repository.owner.html_url
    })
  }

  async init () {
    let { items } = await this.search()
    // cache.client.quit()

    if (!empty(items)) {
      items = items.filter(item =>
        item.html_url.indexOf('test') < 0
      )
    }

    console.log('items.length', items.length)

    if (
      !items.length ||
      this.state.results.index >= (items.length - 1)
    ) {
      console.log('returning', this.state)
      this.state.terms.index++
      this.state.results.index = 0
      return setState(this.state)
    }

    this.result = items[this.state.results.index]

    let { object_url: objectUrl, matches } = get(this.result, ['text_matches', 0], null)

    let code = await nodeFetch(objectUrl)

    this.state.results.index++
    this.content = code.content
    this.matches = matches

    let snippets = this.createSnippets()

    if (empty(snippets)) {
      console.log('empty(snippets)', this.state)
      return setState(this.state)
    }

    await this.setRepo()
    let logged = []

    for (let i = 0; i < snippets.length; i++) {
      let snippet = snippets[i]
      this.state.post.id++

      let record = {
        ...snippet,
        id: generatePostId(this.state.post.id),
        repo: this.result.repository.full_name,
        repoId: '' + this.result.repository.id,
        htmlUrl: code.html_url,
        objectUrl,
        query: this.query
      }

      logged.push(`${now()}: ${record.slug}`)
      db.database().set('messages', record)
    }

    log.append(logged)

    await setState(this.state)
  }
}

exports.handler = async () => {
  let state = await getState()
  log.append(now() + ': ' + JSON.stringify(state))

  console.log('state', state)

  if (state.terms.index >= terms.length) {
    state.terms.index = 0
    state.repos.index++
    return setState(state)
  }

  let handler = new Handler(state)
  handler.init()
}
