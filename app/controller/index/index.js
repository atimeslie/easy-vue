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
      let url = 'http://api.feedback.sogou' +"/public/parseUser?passport="+ encodeURIComponent(ctx.query.passport) + "&targetUrl=" +encodeURIComponent(ctx.query.targetUrl)
      const { status, headers, res } = await ctx.curl(url, {
          method: ctx.method,
          contentType: ctx.method.toUpperCase() === 'POST' ? 'json' : undefined,
          dataType: 'json',
          streaming: true,
          cookie: ctx.request.headers.cookie
      })
      if (headers['set-cookie']) {
          ctx.cookies.set("SESSION", headers["set-cookie"][0].split(";")[0].replace(/SESSION=/,""));
      }
      console.log('headers["set-cookie"][0].split(";")[0].replace(/SESSION=/,"")', headers["set-cookie"][0].split(";")[0].replace(/SESSION=/,""))
      console.log(headers, 111133311)
      let targetUrl = headers.location;
      ctx.unsafeRedirect(targetUrl)
  }
};
