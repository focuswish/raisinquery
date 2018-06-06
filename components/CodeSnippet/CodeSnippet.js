import React from 'react'
import last from 'lodash.last'
import { atob } from '../../lib/query'

function CodeSnippetHeader (props) {
  const { htmlUrl } = props

  return (
    <div
      className='row'
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
      <a
        className='small'
        href={htmlUrl} style={{
          color: '#586069',
          textDecoration: 'none'
        }}>{last(htmlUrl.split('/'))}</a>
    </div>
  )
}

function CodeSnippet (props) {
  const {
    message,
    style
  } = props

  if (!message) return false

  let { code, startIndex, index, htmlUrl } = message

  let lines = atob(code).split('\n')
  const color = (i) => (i) === (index - startIndex)
    ? 'rgba(255,255,140,0.5)' : 'transparent'

  const styles = (i) => ({
    padding: 0,
    display: 'block',
    backgroundColor: color(i)
  })

  lines = lines.map(line => line === '//' ? '' : line)

  return (
    <section style={{...style}} className='margin-right code'>
      <CodeSnippetHeader
        htmlUrl={htmlUrl}
      />
      <pre className='code-snippet'>
        {lines.map((line, i) => <code
          style={styles(i)}
          key={`code_${i}`}
          dangerouslySetInnerHTML={{ __html: line }} className='js' />
        )}
      </pre>
    </section>
  )
}

CodeSnippet.defaultProps = {
  style: {}
}

export default CodeSnippet
