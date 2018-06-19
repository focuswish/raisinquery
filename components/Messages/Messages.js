import React from 'react'
import isEmpty from 'lodash.isempty'
import { atob } from '../../lib/query'
import env from '../../lib/env'

const Message = ({ message, messages }) => (
  <div
    key={`related_pages_div_${message.id}`}
    className='se-pad-10'
    style={{
      borderBottom: '1px solid rgba(27, 31, 35, 0.15)'
    }}
  >
    <a
      className='se-link'
      key={`related_pages_a_${message.id}`}
      href={`${env.BASE_URI}/${message.id}/${message.slug}`}
    >
      <div className='se-flex se-space-between se-flex-row-center'>
        <i className='fa fa-exclamation se-large se-margin-right' aria-hidden='true' />
        <span>{atob(message.message)}</span>
      </div>
    </a>
  </div>
)

class Messages extends React.Component {
  static defaultProps = {
    style: {},
    title: 'Related'
  }

  render () {
    const {
      messages,
      style,
      title
    } = this.props

    if (!messages || isEmpty(messages)) return false

    return (
      <div style={{...style, overflow: 'hidden'}} className='se-column se-border'>
        <div className='se-border-bottom se-bg se-pad-10'>
          <h3 style={{margin: 0}}>{title}</h3>
        </div>
        {messages.map((message, i) =>
          <Message message={message} messages={messages} key={i} />
        )}
      </div>
    )
  }
}

export default Messages
