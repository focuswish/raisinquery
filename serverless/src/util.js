const fetch = require('node-fetch')
const clamp = require('lodash.clamp')
const tools = require('dynamodb-tools')
const s3 = require('s3-tools')

const log = s3.tools({
  bucket: 'stackerror',
  key: 'log.txt'
}, { region: 'us-east-1' })

const prefix = `${process.env.DYNAMODB_TABLE}-`

const db = tools({ prefix })

function nodeFetch (url, params = {}) {
  return fetch(url, params)
    .then(resp => resp.json())
}

function slugify (text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function getCodeSegment (index, codeLines) {
  let startIndex = clamp(index - 5, 0, codeLines.length)
  let endIndex = clamp(index + 5, index, codeLines.length)

  let lines = codeLines.slice(
    startIndex,
    endIndex
  ).map(line => line === '' ? '//' : line)
  return { lines, startIndex }
}

const getState = () => db.database().get('state.data').then(state => state)

const now = (date = new Date()) => ([
  date.getMonth() + 1,
  date.getDate(),
  date.getFullYear()
].join('/') + ' ' + date.getHours() + ':' + date.getMinutes()
)

const setState = (data) => log.append(
    `${now()}: ${JSON.stringify(data)}`,
    { key: 'log.txt' }
  )
  .then(() => db.database().set('state.data', data))

const generatePostId = require('post-id')

const terms = [
  'throw new error',
  'console.warn',
  'console.error',
  'console.log'
]

const blacklist = [
  'freecodecamp',
  'free-programming-books',
  'tensorflow',
  'you-dont-know-js',
  'oh-my-zsh',
  'gitignore',
  'awesome'
]

const clean = (fragments) => ({
  fragments: require('clean-deep')(fragments, {
    emptyArrays: false,
    emptyObjects: false,
    nullValues: false,
    undefinedValues: false
  })
})

exports.log = log
exports.prefix = prefix
exports.nodeFetch = nodeFetch
exports.slugify = slugify
exports.getCodeSegment = getCodeSegment
exports.getState = getState
exports.now = now
exports.setState = setState
exports.generatePostId = generatePostId
exports.terms = terms
exports.blacklist = blacklist
exports.clean = clean
exports.db = db
