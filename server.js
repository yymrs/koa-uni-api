const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-better-body')
const convert = require('koa-convert')
const staticCache = require('koa-static-cache')
const session = require('koa-session')
const mysql = require('mysql-pro')
const cors = require('koa-cors')
const pathlib = require('path')

const config = require('./config')
let server = new Koa()
let r1 = new Router()
server.use(cors({}))
server.use(r1.routes())
server.use(convert(body({
  uploadDir: pathlib.resolve('www/upload')
})))
r1.get('/',(ctx)=>{
  console.log(ctx);
  
  ctx.response.body = '234'
})
server.keys = ['qweqeqwezdfsdgjijfmnxc.nv']
server.use(session({},server))
server.use(staticCache(pathlib.resolve('www')))
server.listen(config.port)