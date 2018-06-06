import CodeSnippet from './CodeSnippet'
import Layout from './Layout'
import RelatedPages from './RelatedPages'
import Repo from './Repo'
import PageTitle from './PageTitle'
import StackOverflowWidget from './Widget/Questions'
import GithubIssuesWidget from './Widget/Issues'

const components = {
  CodeSnippet,
  Layout,
  RelatedPages,
  Repo,
  PageTitle,
  StackOverflowWidget,
  GithubIssuesWidget
}

exports.default = components

exports.CodeSnippet = CodeSnippet
exports.Layout = Layout
exports.RelatedPages = RelatedPages
exports.Repo = Repo
exports.PageTitle = PageTitle
exports.StackOverflowWidget = StackOverflowWidget
exports.GithubIssuesWidget = GithubIssuesWidget
