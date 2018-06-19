import React from 'react'
import 'isomorphic-fetch'
import Layout from '../components/Layout'
import env from '../lib/env'

function RepoTile (props) {
  const { repo } = props

  return (
    <a href={'/repos/' + repo.fullName} key={`a_${repo.id}`}>
      <div
        key={`div_${repo.id}`}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #e8e8e8',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,.05)',
          padding: '4em 0',
          boxSizing: 'border-box'
        }}>
        <img
          key={`img_${repo.id}`}
          src={repo.avatarUrl}
          width='50'
          height='50'
          style={{marginBottom: '10px'}}
        />
        {repo.name}
      </div>
    </a>
  )
}

export default class App extends React.Component {
  static async getInitialProps ({ req, query }) {
    let repos = await fetch(`${env.AWS_LAMBDA_ENDPOINT}/repos`)
      .then(resp => resp.json())

    return { repos }
  }

  render () {
    const { repos } = this.props
    if (!repos) return <Layout />

    return (
      <Layout>
        <div
          className='se-grid'
          style={{
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}>
          {repos.map(repo => <RepoTile repo={repo} key={`repo_tile_${repo.id}`} />)}
        </div>
      </Layout>
    )
  }
}
