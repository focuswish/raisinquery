import React from 'react'
import ReactDOM from 'react-dom'
import 'isomorphic-fetch'
import * as hljs from 'highlight.js'
import CodeSnippet from '../components/CodeSnippet'
import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import Messages from '../components/Messages'
import Repo from '../components/Repo'
import StackOverflowWidget from '../components/Widget/Questions'
import GithubIssuesWidget from '../components/Widget/Issues'

import { handleQuery } from '../lib/query'

export default class Page extends React.Component {
  static async getInitialProps ({ req, query }) {
    let params = await handleQuery(query)

    return params
  }

  highlightCode = () => {
    const domNode = ReactDOM.findDOMNode(this)
    const nodes = domNode.querySelectorAll('pre.se-code-snippet code')
    let i
    for (i = 0; i < nodes.length; i++) {
      hljs.highlightBlock(nodes[i])
    }
  }

  componentDidMount () {
    this.highlightCode()
  }

  render () {
    let { data, data: { repo }, url } = this.props

    let messages = repo && repo.messages ? repo.messages.slice(0, 5) : []
    return (
      <Layout>
        <PageTitle data={data} />
        <Repo repo={repo} />
        <div
          className='se-row se-gutter se-mobile'
          style={{
            justifyContent: 'space-between'
          }}>
          <CodeSnippet message={data} />
          <Messages messages={messages} style={{flexBasis: `40%`}} />
        </div>
        <div className='se-row se-mobile se-space-between'>
          <GithubIssuesWidget issues={data.issues} />
          <StackOverflowWidget questions={data.questions} />
        </div>
      </Layout>
    )
  }
}
