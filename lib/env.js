const env = (typeof window !== 'undefined' ? window.__ENV__ : process.env)

if (env.NODE_ENV !== 'production') {
  env.BASE_URI = env.DEV_BASE_URI
} else {
  env.BASE_URI = env.PROD_BASE_URI
}

export default env
