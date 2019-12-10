'use strict';
const egg = require('egg');
module.exports = class BackendController extends egg.Controller {
    async apis() {
        const { ctx } = this
        const querystring = ctx.request.querystring ? '?' + ctx.request.querystring : ''
        const requestPath = ctx.request.path
        let url = `http://${ctx.app.config.apiHost}${requestPath}${querystring}`
        const userInfo = {
            sgid: ctx.sgid,
            device_id: ctx.device_id,
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
        })
        ctx.type = headers['content-type'] || headers['Content-Type']
        ctx.status = status
        ctx.body = res
    }
};
