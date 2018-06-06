const fs = require('fs-extra')
const execa = require('execa')
require('dotenv').config()

const {
  SE_CLIENT_KEY,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_TOKEN,
  AWS_LAMBDA_ENDPOINT,
  DEV_BASE_URI,
  PROD_BASE_URI
} = process.env

async function run () {
  let json = await fs.readJson('up.json')

  let environment = {
    SE_CLIENT_KEY,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_TOKEN,
    AWS_LAMBDA_ENDPOINT,
    DEV_BASE_URI,
    PROD_BASE_URI
  }

  await fs.writeJson('up.json', { ...json, environment })
  let up = execa('up', ['deploy', 'production'])
  up.stdout.pipe(process.stdout)
  await up
  await fs.writeJson('up.json', json)
}

run()
