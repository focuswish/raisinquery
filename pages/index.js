import React from 'react'
import ReactDOM from 'react-dom'
import 'isomorphic-fetch'
import * as hljs from 'highlight.js'
import stylesheet from '../styles/index.scss'
import Code from '../components/Code'

function RelatedPages(props) {
  const { all } = props;

  if(!all || all.length < 1) return false
  
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {all.map(page => 
        <div key={`div_${page.title}`}>
        <a 
          key={`a_${page.title}`}
          href={`http://localhost:3000/${page.id}`}>{page.repoName + ' > ' + page.message}</a>
        </div>
      )}
    </div>
  )
}

function stackOverflowApi (query) {  
  let q = encodeURIComponent(
    query.split('/').join('-').split('-').join(' ')
  )
  let url = `https://api.stackexchange.com/2.2/search/advanced?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=relevance&q=${q}&filter=default`
  
  return fetch(url)
    .then(resp => resp.json())
}

export default class App extends React.Component {

  static async getInitialProps({ req, query }) {
    let params = {}

    if(query['0'] && query['0'] !== '/favicon.ico') {
      let url = 'https://8d448wxqy3.execute-api.us-east-1.amazonaws.com/dev/api?id='

      url += query['0'].replace('/', '')
      let resp = await fetch(url)
      params.data = await resp.json()  

      let { items } = await stackOverflowApi(query['0'])
      params.answers = items;
    }   

    let resp2 = await fetch('https://8d448wxqy3.execute-api.us-east-1.amazonaws.com/dev/api?all=true')
    
    params.all = await resp2.json()
    
    return params;

  }
  
  highlightCode = () => {
    const domNode = ReactDOM.findDOMNode(this);
    const nodes = domNode.querySelectorAll('pre code');

    let i;
    for (i = 0; i < nodes.length; i++) {
      hljs.highlightBlock(nodes[i]);
    }
  }

  componentDidMount() {
    this.highlightCode()
  }

  render() {
    let { data, all, answers } = this.props
    console.log(this.props.answers)

    if(!data.lines) {
      return <div></div>
    }
    return(
      <div style={{maxWidth: '660px', margin: '20px auto'}}>
        <h1>{data && data.message}</h1>
        <p>{data && data.repoName}</p>
        {data && <Code {...this.props} />}
        <RelatedPages {...this.props} />
        <div>{answers && answers.map(ans => <div>{ans.title}</div>)}</div>
      </div>
    )
  }
}