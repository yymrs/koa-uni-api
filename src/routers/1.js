const Router = require('koa-router')
let route = new Router()
// localhost:8080/
route.get('/api/index/imgulr',async (ctx)=>{
    console.log(ctx.db);
    let data = await ctx.db.execute('select * from index_img')
    console.log(data);
    // await ctx.render('1',{a:12})
    ctx.body = data
})
route.get('/b',async (ctx)=>{
    ctx.body = 'bbbbb'
})
module.exports = route.routes()