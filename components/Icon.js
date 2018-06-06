import react from 'react'

function Icon (props) {
  const {
    label,
    icon,
    link
  } = props

  return (
    <div className='row space-between'>
      <span className='margin-right'>
        <a className='link-muted' href={link}>{label}</a>
      </span>
      <i className={`fa ${icon} large`} aria-hidden='true' />
    </div>
  )
}

Icon.defaultProps = {
  link: '#',
  label: ''
}

export default Icon
