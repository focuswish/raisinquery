import * as fetch from "node-fetch";
import * as tools from "dynamodb-tools";
import repos from './repos'
import * as clamp from 'lodash.clamp'
import * as empty from 'lodash.isempty'
import * as mapKeys from 'lodash.mapkeys'
import * as camelCase from 'lodash.camelcase'
import {
  log,
  atob,
  get,
  reverseStr,
  getCodeSegment,
  getState,
  setState,
  innerContents
} from './util'

import slugify from 'slugify'

async function initialFetch({ query, repoIndex }) {
  let repo = repos.items[repoIndex]  
  log(['repo', repo])

  let { full_name } = repo

  let q = encodeURIComponent(query)
  let url = `https://api.github.com/search/code?q=${q}+in:file+language:js+repo:${full_name}`;

  return get(url, {
    headers: {
      Accept: "application/vnd.github.v3.text-match+json"
    }
  })
}

function createSnippets(props) {
  log(['createSnippet', props])

  let { 
    content, 
    matches
  } = props;
  
  let decoded = atob(content).split("\n");
  
  log(['createSnippet', decoded])
  
  let text = matches[0].text;
  
  return decoded.reduce((acc, val, i, arr) => {
    if (val.indexOf(text) > -1) {
      let message = innerContents(arr.slice(i, i + 2).join(''))
      console.log('message', message)
      let { lines, startIndex } = getCodeSegment(i, arr)

      if (message) {
        acc.push({
          index: i,
          startIndex,
          lines,
          message
        })
      }
    }

    return acc;
  }, []);
}

export default async function() {
  let store = await getState()
  let query = 'throw new error'
  let searchResults = await initialFetch({
    query,
    repoIndex: store.repo_index
  })

  if(empty(searchResults.items) ||
    searchResults.items.length < 1
  ) {
    store.repo_index++
    store.search_index = 0;
  }

  if(empty(searchResults.items)) {
    setState({ store })    
    return
  }

  process.env.REPO_INDEX = store.repo_index;
  
  let item = searchResults.items[store.search_index];

  log(['item', item])

  let { repository } = item;
  let { owner } = repository;
  let { object_url : objectUrl, matches } = item.text_matches[0];

  let code = await get(objectUrl)

  store.search_index++
  
  log(['code', code])

  let { content, html_url : htmlUrl } = code;
  
  let snippets = createSnippets({
    content,
    matches,
  })

  log(['snippets', snippets])
  
  if(!snippets || snippets.length === 0) {
    return setState({ store })
  }
  
  let { name: repoName, id: repoId} = repository

  snippets.forEach(snippet => {
    let message = snippet.message.toLowerCase()
    let id = repoName + '/' + slugify(message)
    //remove: /[$*_+~.()'"!\-:@]/g
    let input = {
      ...snippet,
      id,
      repoName,
      repoId,
      objectUrl,
      htmlUrl,
      query
    }
    
    tools.create(
     "posts", { input }
    );
  });

  setState({ store })
}
