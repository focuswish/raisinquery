import * as fetch from 'node-fetch';
import * as clamp from 'lodash.clamp'
import * as tools from "dynamodb-tools";

const { db } = tools;
const TableName = `${process.env.DYNAMODB_TABLE}-state`

export function log(args) {
  let debug : any = process.env.DEBUG;

  if(debug) {
    console.log(...args)
  }
}

export function atob(a) {
  return new Buffer(a, "base64").toString("binary");
}

export function get(url, params = {}) {
  return fetch(url, params).then(resp => resp.json());
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function reverseStr(str) {
  return str
    .split(" ")
    .reverse()
    .join(" ");
}

function occurences (iterable, values) {
  return iterable.reduce((acc, val, i) => {
    if (values.indexOf(val) > -1) acc.push(i);
    return acc;
  }, []);
}

export function innerContents(code) {
	let chars = code.split('')
  let shouldStop = false;
  
  return chars.reduce((acc, val, i, arr) => {
    let shouldStart = arr.slice(0, i).indexOf('(') > -1 || acc.length > 0
    let occOpenParen = occurences(arr.slice(0, i + 1), ['(']).length
    let occCloseParen = occurences(arr.slice(0, i + 1), [')']).length
    
    if(!shouldStop) shouldStop = occOpenParen === occCloseParen
        
   if(shouldStart && !shouldStop && ['"', '`', '\''].indexOf(val) < 0) {
    	acc.push(val)
    } 
    
    return acc;
  }, []).join('')
}

export function getCodeSegment(index, codeLines) {
  let startIndex = clamp(index - 5, 0, codeLines.length)
  let endIndex = clamp(index + 5, index, codeLines.length)

  let lines = codeLines.slice(
    startIndex,
    endIndex
  ).map(line => line === '' ? '//' : line)
  return { lines, startIndex }
}

export async function getState() {
  let data = await db.get({ TableName, Key: { id: 'data' } })
  return data.store;
}

export function setState(data) {
  const exp = Object.keys(data).map(key => `#${key} = :${key}`).join(', ')
  
  const params = {
    TableName,
    Key: { id: 'data' },
    ...tools.mapAttributes(data),
    UpdateExpression: `SET ${exp}`,
    ReturnValues: 'ALL_NEW',
  }
  return db.updateItem(params)  
}