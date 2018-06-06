const withSass = require('@zeit/next-sass')
const stage = process.env.UP_STAGE

module.exports = {
  ...withSass()
  // assetPrefix: stage ? `/${stage}` : ''
}
