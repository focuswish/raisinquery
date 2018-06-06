import react from 'react'

function WidgetTitle (props) {
  const {
    title,
    icon
  } = props

  return (
    <div
      className='row space-between bg gutter'
      style={{alignItems: 'center', padding: '0 10px'}}
    >
      <h3
        style={{
          borderRadius: '3px'
        }}>
        {title}
      </h3>
      <i className={`fa ${icon} large`} aria-hidden='true' />
    </div>
  )
}

export default WidgetTitle
