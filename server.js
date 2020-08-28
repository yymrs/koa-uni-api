const Koa = require('koa')
const body = require('koa-better-body')
const convert = require('koa-convert')
const staticCache = require('koa-static-cache')
const session = require('koa-session')
const cors = require('@koa/cors')
const pathlib = require('path')
const config = require('./config')
const error = require('./libs/error.handler')
const log = require('./libs/log')
let server = new Koa()
error(server)
log(server)
server.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});
server.use(async (ctx,next)=>{
  ctx.db = require('./libs/db')
  await next()
})
server.use(require('./src/routers/1'))
// server.use(cors())
server.use(convert(body({
  uploadDir: pathlib.resolve(config.uploadDir)
})))

server.keys = config.keys
server.use(session({},server))
server.use(staticCache(pathlib.resolve(config.static)))
server.listen(config.prot)