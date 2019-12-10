'use strict';
const egg = require('egg');
module.exports = class BackendController extends egg.Controller {
    async apis() {
        const { ctx } = this
        const querystring = ctx.request.querystring ? '?' + ctx.request.querystring : ''
        const requestPath = ctx.request.path
        let url = `http://${ctx.app.config.apiHost}${requestPath}${querystring}`
        const userInfo = {
        }
        const { status, headers, res } = await ctx.curl(url, {
            method: ctx.method,
            data: ['POST', 'PUT'].includes(ctx.method.toUpperCase()) ? {
                ...ctx.request.body,
                ...userInfo,
            } : userInfo,
            contentType: ctx.method.toUpperCase() === 'POST' ? 'json' : undefined,
            dataType: 'json',
            streaming: true,
            cookie:ctx.request.headers.cookie
        })
        // console.log(res,status,111111111111111111111111111111)
        // console.log(ctx.request, 111111111111111111)
        ctx.type = headers['content-type'] || headers['Content-Type']
        ctx.status = status
        ctx.body = res
    }
};
