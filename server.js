const express = require('express')
const path = require('path')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const next = require('next')
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()
 
app.prepare().then(() => {
   server.use('/_next', express.static(path.join(__dirname, '.next')))

   server.get('*', (req, res) => {
     return handle(req, res)
   })
 
   server.listen(port, err => {
     if (err) throw err
     console.log(`> Ready on http://localhost:${port}`)
   })
})

module.exports = server