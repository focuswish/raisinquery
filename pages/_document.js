import Document_, { Head, Main, NextScript } from 'next/document'

const {
  NODE_ENV,
  AWS_LAMBDA_ENDPOINT,
  PROD_BASE_URI,
  DEV_BASE_URI,
  UP_STAGE
} = process.env

const env = { NODE_ENV, AWS_LAMBDA_ENDPOINT, DEV_BASE_URI, PROD_BASE_URI, UP_STAGE }
// const assetPrefix = UP_STAGE ? `/${UP_STAGE}` : ''
const assetPrefix = ''
const styleHref = `${assetPrefix}/_next/static/style.css`

export default class Document extends Document_ {
  static async getInitialProps (ctx) {
    const props = await Document_.getInitialProps(ctx)
    return props
  }

  render () {
    const json = JSON.stringify(env)
    return (
      <html>
        <Head>
          <link
            rel='stylesheet'
            href={styleHref}
          />
        </Head>
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{ __html: '__ENV__ = ' + json }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}
