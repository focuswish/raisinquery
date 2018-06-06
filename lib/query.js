import 'isomorphic-fetch'
import env from './env'

export const { AWS_LAMBDA_ENDPOINT } = env
export const { BASE_URI } = env

export function atob (a) {
  return new Buffer(a, 'base64').toString('binary')
};

export function btoa (b) {
  return new Buffer(b).toString('base64')
}

export function stackOverflowApi (query) {
  let { repoName, message } = query
  repoName = encodeURIComponent(repoName)
  message = encodeURIComponent(message)
  let url = `${BASE_URI}/api/questions/${repoName}?q=${message}`

  return fetch(url)
    .then(resp => resp.json())
}

export function githubIssuesApi (query) {
  let { repoFullName, message } = query
  repoFullName = encodeURIComponent(repoFullName)
  message = encodeURIComponent(message)
  let url = `${BASE_URI}/api/issues/${repoFullName}?q=${message}`

  return fetch(url)
    .then(resp => resp.json())
}

export async function handleQuery (query) {
  console.log(query)
  let { repoId } = query

  if (query.messageId) {
    let url = `${env.AWS_LAMBDA_ENDPOINT}/message?id=${query.messageId}`
    let resp = await fetch(url)
    let data = await resp.json()
    repoId = data.repoId

    let questions = await stackOverflowApi({
      message: atob(data.message),
      repoName: data.repo.name
    })

    let issues = await githubIssuesApi({
      message: atob(data.message),
      repoFullName: data.repo.fullName
    })

    return {
      data: {
        ...data,
        questions,
        issues
      }
    }
  }

  return {}
}
