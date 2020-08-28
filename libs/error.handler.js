const pathlib = require('path')
const fs = require('fs')
module.exports = server=>{
    server.use(handler)
}
async function handler(ctx,next) {
    try {
        await next()
    } catch (e) {
        console.log(e);
        ctx.body = '服务器维护中'
    }
}