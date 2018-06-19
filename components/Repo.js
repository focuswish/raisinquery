import React from 'react'
import isEmpty from 'lodash.isempty'
import Icon from './Icon'
import env from '../lib/env'

function Repo (props) {
  const { repo } = props
  if (isEmpty(repo)) return false

  const {
    name,
    avatarUrl,
    id,
    fullName
  } = repo

  let link = `https://github.com/${repo.fullName}`

  return (
    <div
      className='se-row se-bg se-gutter-10 se-pad-10'
      style={{
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      >
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img src={avatarUrl} width='40' height='40' style={{marginRight: '10px'}} />
        <a href={`${env.BASE_URI}/repos/${fullName}`}>{name}</a>
      </div>
      <div className='se-row se-space-between' style={{width: '50%'}}>
        <Icon
          label={repo.stars}
          link={link}
          icon={'fa-star'}
        />
        <Icon
          label={repo.forks}
          link={link}
          icon={'fa-code-fork'}
        />
        <Icon
          label={repo.fullName}
          link={link}
          icon={'fa-github'}
        />
      </div>

    </div>
  )
}

export default Repo
