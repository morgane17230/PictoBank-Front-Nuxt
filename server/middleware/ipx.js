import { createIPX, createIPXMiddleware } from 'ipx'

// https://github.com/unjs/ipx
const ipx = createIPX({
  dir: './static/', // absolute path to images dir
  domains: [
    'https://pictos.s3.eu-west-3.amazonaws.com/images/',
    'https://pictos.s3.eu-west-3.amazonaws.com/avatars/'
  ],
  alias: {}, // base alias
  sharp: {} // sharp options
})

export default createIPXMiddleware(ipx)
