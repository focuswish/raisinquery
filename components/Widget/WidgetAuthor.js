import react from 'react'

function WidgetAuthor (props) {
  const {
    avatar,
    url,
    name
  } = props

  return (
    <div
      className='se-row se-space-between'
      style={{
        alignItems: 'center'
      }}>
      <img src={avatar} width='30' height='30' style={{marginRight: '10px'}} />
      <a href={url}>{name}</a>
    </div>
  )
}

export default WidgetAuthor
