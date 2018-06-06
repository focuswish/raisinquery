import React from 'react'
import '../styles/main.scss'

const BrandIcon = ({ fill }) => (
  <svg
    width='20px'
    height='20px'
    viewBox='0 0 20 20'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
      <g id='Group' transform='translate(-2.000000, -2.000000)'>
        <polygon id='Shape' points='0 0 24 0 24 24 0 24' />
        <path d='M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M13,17 L11,17 L11,15 L13,15 L13,17 Z M13,13 L11,13 L11,7 L13,7 L13,13 Z' id='Shape' fill={fill} fill-rule='nonzero' />
      </g>
    </g>
  </svg>
)

BrandIcon.defaultProps = {
  fill: '#F0B7BC'
}

function Header () {
  return (
    <header>
      <div className='row'>
        <a href={'/'} className='brand'>
          <div className='row flex-row-center space-between'>
            <span className='margin-right brand-icon'><BrandIcon /></span>
            <span>StackError.io</span>
          </div>
        </a>
      </div>
    </header>
  )
}

function Layout (props) {
  return (
    <div>
      <Header />
      <div className='container'>
        {props.children}
      </div>
    </div>
  )
}

export default Layout
