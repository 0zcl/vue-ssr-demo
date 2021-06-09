  
const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const backendApp  = new Koa()
const frontendApp  = new Koa()
const backendRouter = new Router()
const frontendRouter = new Router()
const { createBundleRenderer } = require('vue-server-renderer')

const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'))
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'))
const template = fs.readFileSync(path.resolve(__dirname, '../src/index.ssr.html'), 'utf-8')
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: template,
  clientManifest: clientManifest
})

// 后端Server
backendApp.use(serve(path.resolve(__dirname, '../dist')))

// https://github.com/koajs/router/issues/76
backendRouter.get('(.*)', (ctx, next) => {
  console.log('ctx', ctx);
  console.log('url', ctx.url);

  let context = {
    url: ctx.url
  };

  const ssrStream = renderer.renderToStream(context);
  ctx.status = 200;
  ctx.type = 'html';
  ctx.body = ssrStream
})

backendApp
  .use(backendRouter.routes())
  .use(backendRouter.allowedMethods())

frontendApp.use(serve(path.resolve(__dirname, '../dist')))

frontendRouter.get('(.*)', (ctx, next) => {
  let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  ctx.type = 'html';
  ctx.status = 200;
  ctx.body = html;
});

frontendApp
  .use(frontendRouter.routes())
  .use(frontendRouter.allowedMethods())

backendApp.listen(9998,  () => {
  console.log('服务端渲染地址： http://localhost:9998');
})

frontendApp.listen(9999,  () => {
  console.log('浏览器端渲染地址： http://localhost:9999');
})