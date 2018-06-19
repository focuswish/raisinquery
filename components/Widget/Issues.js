import React from 'react'
import isEmpty from 'lodash.isempty'
import get from 'lodash.get'
import marked from 'marked'
import WidgetTag from './WidgetTag'
import WidgetContent from './WidgetContent'
import WidgetTitle from './WidgetTitle'
import WidgetAuthor from './WidgetAuthor'

function GithubIssue (props) {
  const {
    issue,
    handleExpand,
    isExpanded,
    params
  } = props

  let html = marked(issue.body)

  return (
    <div
      style={{
        justifyContent: 'space-between'
      }}
      onClick={() => handleExpand(issue.id)}
      id={issue.id}
      className={'se-github-issue se-column se-widget'}
    >
      <h3
        key={issue.id}
        style={{margin: '0 0 10px 0' }}
      >
        {issue.title}
      </h3>

      <div
        className='se-row se-gutter se-space-between'
        style={{
          alignItems: 'center',
          width: '100%'
        }}>
        <WidgetAuthor
          url={issue.user.html_url}
          avatar={issue.user.avatar_url}
          name={issue.user.login}
        />
        <div>
          {issue.labels.map(label =>
            <WidgetTag tag={label.name} key={`tag_component_${label.id}`} />
          )}
        </div>

      </div>
      <WidgetContent html={html} isExpanded={isExpanded} />

      <div
        className='se-row'
        style={{
          fontSize: '14px'
        }}
      >
        <a href={issue.url} style={{textDecoration: 'none'}}>[link to Gihub issue]</a>
      </div>
    </div>
  )
}

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '50%',
  maxWidth: '470px'
}

class GithubIssuesWidget extends React.Component {
  state = {
    issues: {}
  }

  handleExpand = (id) => {
    const { issues } = this.state
    if (!issues[id]) issues[id] = {}
    issues[id].open = get(issues, [id, 'open']) !== true
    this.setState({ issues })
  }

  isExpanded = (id) => get(this.state.issues, [id, 'open']) || false

  /* componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);
    const nodes = [...domNode.querySelectorAll('.github-issue')]
    const { issues } = this.state
    for (let node of nodes) {
      issues[node.id] = {
        ...issues[node.id] ? issues[node.id] : {},
        height: node.clientHeight,
        width: node.clientWidth
      }
    }
    this.setState({issues})
  } */

  render () {
    const { issues } = this.props
    if (isEmpty(issues)) return false

    return (
      <div
        style={{flexBasis: 'calc(50% - 20px)', maxWidth: 'calc(50% - 20px)'}}
        className='column margin-right'>
        <WidgetTitle title={'Github Issues'} icon='fa-github' />

        {issues.slice(0, 5).map(issue =>
          <GithubIssue
            key={`title_${issue.id}`}
            issue={issue}
            handleExpand={this.handleExpand}
            isExpanded={this.isExpanded(issue.id)}
            params={this.state.issues}
          />
        )}
      </div>
    )
  }
}

export default GithubIssuesWidget
