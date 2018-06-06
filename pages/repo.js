import React from 'react'
import 'isomorphic-fetch'
import Layout from '../components/Layout'
import Messages from '../components/Messages'
import Repo from '../components/Repo'
import env from '../lib/env'

export default class RepoPage extends React.Component {
  static async getInitialProps ({ req, query }) {
    let url = `${env.AWS_LAMBDA_ENDPOINT}/repo?fullName=${query.user}/${query.name}`
    let repo = await fetch(url).then(resp => resp.json())

    return { data: { repo } }
  }

  render () {
    let { data: { repo } } = this.props

    if (!repo.messages) return false

    return (
      <Layout>
        <Repo repo={repo} />
        <Messages messages={repo.messages} title={`${repo.name} Errors`} />
      </Layout>
    )
  }
}
