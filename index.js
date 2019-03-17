const sls = require('serverless-http')
const binaryMimeTypes = require('./binaryMimeTypes')

const server = require('./server/app')

module.exports.server = sls(server, {
  binary: binaryMimeTypes
})