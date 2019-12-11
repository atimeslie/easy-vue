'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.all(/^\/user\/.*/, controller.backend.backend.apis)
  router.get('/', controller.index.index.ssr);
  router.get('/category', controller.category.category.index);
  router.get('/public/parseUser', controller.index.index.setCookie)
};
