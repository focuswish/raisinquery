import React from 'react'
import { atob } from '../lib/query'

function Title (props) {
  const { data } = props
  if (!data) return false

  return (
    <div>
      <h1>{atob(data.message)}</h1>
    </div>
  )
}

export default Title
