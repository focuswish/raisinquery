const withSass = require('@zeit/next-sass')

module.exports = {
  ...withSass()
  // assetPrefix: stage ? `/${stage}` : ''
}
