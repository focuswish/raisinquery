import react from 'react'

export default function WidgetTag (props) {
  return (
    <span
      style={{
        padding: '5px 10px',
        color: '#d73a49',
        border: '1px solid #d73a49',
        borderRadius: '3px',
        marginRight: '5px',
        fontSize: '12px'
      }}
      key={`tag_${props.tag}`}
    >
      {props.tag}
    </span>
  )
}
