const fs = require('fs')
const config = require('../config')
module.exports = server=>{
    server.use(async (ctx,next)=>{
        await new Promise((reslove,rejects)=>{
            fs.appendFile(config.logpath,`[${Date.now()}] ${ctx.method} ${ctx.url}\r\n`, async err=>{
                reslove()
            })
        })
        await next()
    })
}