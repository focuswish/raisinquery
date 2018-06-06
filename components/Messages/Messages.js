import React from 'react'
import isEmpty from 'lodash.isempty'
import { atob } from '../../lib/query'
import env from '../../lib/env'

const Message = ({ message, messages }) => (
  <div
    key={`related_pages_div_${message.id}`}
    className='pad-10'
    style={{
      borderBottom: '1px solid rgba(27, 31, 35, 0.15)'
    }}
  >
    <a
      className='link'
      key={`related_pages_a_${message.id}`}
      href={`${env.BASE_URI}/${message.id}/${message.slug}`}
    >
      <div className='flex space-between flex-row-center'>
        <i className='fa fa-exclamation large margin-right' aria-hidden='true' />
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
      <div style={{...style, overflow: 'hidden'}} className='column border'>
        <div className='border-bottom bg pad-10'>
          <h3 style={{margin: 0}}>{title}</h3>
        </div>
        {messages.map((message, i) =>
          <Message message={message} messages={messages} />
        )}
      </div>
    )
  }
}

export default Messages
