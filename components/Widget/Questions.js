import React from 'react'
import isEmpty from 'lodash.isempty'
import WidgetTag from './WidgetTag'
import WidgetContent from './WidgetContent'
import WidgetTitle from './WidgetTitle'
import WidgetAuthor from './WidgetAuthor'

import truncatise from 'truncatise'
import marked from 'marked'

function StackOverflowEntry (props) {
  let {
    question,
    handleExpand,
    isExpanded
  } = props

  let html = marked(question.body_markdown)

  return (
    <div
      className='hover column widget'
      style={{
        justifyContent: 'space-between'
      }} onClick={() => handleExpand(question.question_id)}>
      <h3
        style={{margin: '0 0 10px 0'}}
        key={question.question_id}
        dangerouslySetInnerHTML={{ __html: question.title }}
      />
      <div
        className='row gutter space-between flex-row-center'
        style={{
          width: '100%'
        }}
      >
        <WidgetAuthor
          url={question.owner.link}
          avatar={question.owner.profile_image}
          name={question.owner.display_name}
        />
        <div>
          {question.tags.map(tag => <WidgetTag tag={tag} key={`tag_component_${tag}`} />)}
        </div>
      </div>
      <WidgetContent html={html} isExpanded={isExpanded} />
    </div>
  )
}

class StackOverflowWidget extends React.Component {
  state = {
    questions: {}
  }

  handleExpand = (id) => {
    const { questions } = this.state
    questions[id] = questions[id] === true ? !questions[id] : true
    this.setState({ questions })
  }

  isExpanded = (id) =>
    this.state.questions[id] ? this.state.questions[id] : false;

  render () {
    const { questions } = this.props
    if (isEmpty(questions)) return false

    return (
      <div
        style={{flexBasis: 'calc(50% - 20px)', maxWidth: 'calc(50% - 20px)'}}
        className='column'
      >
        <WidgetTitle title={'StackOverflow Questions'} icon='fa-stack-overflow' />
        <div>{questions.map(question =>
          <StackOverflowEntry
            key={`title_${question.question_id}`}
            question={question}
            handleExpand={this.handleExpand}
            isExpanded={this.isExpanded(question.question_id)}
          />
        )}</div>
      </div>
    )
  }
}

export default StackOverflowWidget
