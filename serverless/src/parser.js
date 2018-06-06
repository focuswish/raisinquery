const acorn = require('acorn')
const walk = require('acorn/dist/walk')
const get = require('lodash.get')
const isEmpty = require('lodash.isempty')

function parseCode (code) {
  let fragments = []
  let tree = null
  let message = null

  function handleToken (exp) {
    if (!exp.type) throw new Error(exp)

    switch (exp.type) {
      case 'TemplateLiteral':
        exp.expressions
          .concat(exp.quasis)
          .map(e => handleToken(e))
        break
      case 'Literal':
        fragments.push({
          type: exp.type,
          index: exp.start,
          value: exp.value
        })
        break
      case 'Identifier':
        fragments.push({
          type: exp.type,
          index: exp.start,
          value: exp.name
        })
        break
      case 'BinaryExpression':
        [exp.left, exp.right].map(exp => handleToken(exp))
        break
      case 'TemplateElement':
        fragments.push({
          type: exp.type,
          index: exp.start,
          value: exp.value.cooked
        })
        break
      default:
    }
  }

  walk.simple(acorn.parse(code), {
    Program (node) {
      if (!tree) {
        tree = get(node, ['body', 0]) || null
      }
    }
  })

  if (!tree) throw new Error('!tree')

  let arg = get(tree, ['expression', 'arguments', 0]) ||
      get(tree, ['argument', 'arguments', 0])

  handleToken(arg)

  if (isEmpty(fragments)) throw new Error('fragments empty')

  fragments = fragments.sort((a, b) => a.index - b.index)
  message = fragments.map(fragment => fragment.value).join('')

  return {
    fragments,
    tree,
    message,
    type: tree.type || null
  }
}

function parser (lines, i = 0) {
  if (i > lines.length) return undefined
  let code = lines[i]
  try {
    return parseCode(code)
  } catch (err) {
    console.log(err)
    i++
    return parser(lines, i)
  }
}

module.exports = parser
