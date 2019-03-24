const express   = require('express')
const path      = require('path')
const session   = require("express-session")
const expressValidator = require("express-validator")
const mongoose  = require("mongoose")
const cors      = require("cors")
const passport  = require("passport")
const logger    = require("morgan")
const MongoStore= require("connect-mongo")(session)
const next      = require('next')

/* Loads all variables from .env file to "process.env" */
require("dotenv").config();
const dev       = process.env.NODE_ENV !== 'production'
const port      = parseInt(process.env.PORT, 10) || 3000
const app       = next({ dev })
const handle    = app.getRequestHandler()
const server    = express()
const routes    = require("./routes")
require("./config/passport-local")

mongoose
   .connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
   })
   .then(() => console.log("DB connected"))
   .catch(err => console.log(`DB connection error: ${err.message}`));
   
app.prepare().then(() => {
   server.use('/_next', express.static(path.join(__dirname, '.next')))
   /* Body Parser built-in to Express as of version 4.16 */
   server.use(express.json());
   server.use(expressValidator());

  const sessionConfig = {
    name: "next-connect.sid",
    // secret used for using signed cookies w/ the session
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60 // save session for 14 days
    }),
    // forces the session to be saved back to the store
    resave: false,
    // don't save unmodified sessions
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14 // expires in 14 days
    }
   };
   // if (!dev) {
   //    sessionConfig.cookie.secure = true; // serve secure cookies in production environment
   //    server.set("trust proxy", 1); // trust first proxy
   // }
   /* Apply our session configuration to express-session */
   server.use(session(sessionConfig));
   
   server.use((req, res, next) => {
      res.locals.user = req.user || null;
      next();
   });
   /* Add passport middleware to set passport up */
   server.use(passport.initialize());
   server.use(passport.session());
     /* morgan for request logging from client
   - we use skip to ignore static files from _next folder */
   server.use(
      logger("dev", {
      skip: req => req.url.includes("_next")
      })
   );
   server.use("/" , cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200 
   }) ,routes)
   /* Error handling from async / await functions */
   server.use((err, req, res, next) => {
      const { status = 500, message } = err;
      res.status(status).json(message);
   });
   server.get('*', (req, res) => {
     return handle(req, res)
   })
 
   server.listen(port, err => {
     if (err) throw err
     console.log(`> Ready on http://localhost:${port}`)
   })
})

module.exports = server