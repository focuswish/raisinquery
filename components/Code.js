import React from 'react'
import stylesheet from '../styles/index.scss'

function Code(props) {
  const {
    data
  } = props;

  const { lines, startIndex, index } = data;
  const color = (i) => (i) === (index - startIndex) ? 
    'rgba(255,255,140,0.5)' : 'transparent'

  const styles = (i) => ({
    padding: 0,
    display: 'block', 
    backgroundColor: color(i)
  })

  return(
    <div>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />   
       
      <pre>
        {lines.map((line,i) => <code 
          style={styles(i)}
          key={`code_${i}`}
          dangerouslySetInnerHTML={{__html: line }} className="js" />
        )}
      </pre>
    </div>
  )
}

export default Code;