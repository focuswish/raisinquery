import react from 'react'

function WidgetContent (props) {
  const { html, isExpanded } = props
  if (!isExpanded) return false

  return (
    <div className='row'>
      <div dangerouslySetInnerHTML={{ __html: html }} style={{maxWidth: '100%'}} />
    </div>
  )
}

export default WidgetContent
