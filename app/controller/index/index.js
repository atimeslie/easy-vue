'usestrict';
const egg = require('egg');
module.exports = class IndexController extends egg.Controller {

  async ssr() {
    const result = this.service.article.getArtilceList();
    await this.ctx.render('index/index.js', result);
  }

  async csr() {
    const result = this.service.article.getArtilceList();
    await this.ctx.renderClient('index/index.js', result);
  }

  async list() {
    this.ctx.body = this.service.article.getArtilceList(this.ctx.query);
  }

  async detail() {
    const id = this.ctx.query.id;
  }

  async setCookie() {
      const { ctx } = this
      let url = 'http://127.0.0.1:7001' +"/public/parseUser?passport="+ encodeURIComponent(ctx.query.passport) + "&targetUrl=" +encodeURIComponent(ctx.query.targetUrl)
      const { status, headers, res } = await ctx.curl(url, {
          method: 'GET',
          contentType: ctx.method.toUpperCase() === 'POST' ? 'json' : undefined,
          dataType: 'json',
          streaming: true,
          cookie: ctx.request.headers.cookie
      })
      console.log(headers,11111111111111111111)
      console.log(headers['set-cookie'], 111111111111111111111111)
      if (headers['set-cookie']) {
          ctx.cookies.set("SESSION", response.headers["set-cookie"][0].split(";")[0].replace(/SESSION=/,""));
      }
      let targetUrl = ctx.headers.referer;
      ctx.redirect(targetUrl)
  }
};
