import react from 'react'

function Icon (props) {
  const {
    label,
    icon,
    link
  } = props

  return (
    <div className='se-row se-space-between'>
      <span className='se-margin-right'>
        <a className='se-link-muted' href={link}>{label}</a>
      </span>
      <i className={`fa ${icon} se-large`} aria-hidden='true' />
    </div>
  )
}

Icon.defaultProps = {
  link: '#',
  label: ''
}

export default Icon
