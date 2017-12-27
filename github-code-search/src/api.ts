import * as tools from 'dynamodb-tools'

const createResponse = (message = {}) => ({
  statusCode: 200,
  body: JSON.stringify(message),
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

export default async (event, context, callback) => {
  let { queryStringParameters } = event;
  let { id, all } = queryStringParameters;
  const TableName = `${process.env.DYNAMODB_TABLE}-posts`
  
  if(all) {
   let posts = await tools.db.scan({ TableName }) 
   console.log(posts)
   return callback(null, createResponse(posts))
  }

  tools.getById('posts', id).then(data => {
    console.log(data)
    
    callback(null, createResponse(data))
  }).catch(message => {
    callback(null, createResponse({...message, error: true}))
  })
}