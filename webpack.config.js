'use strict';

module.exports = {
  entry: {
    'index/index': 'app/web/page/index/index.vue',
    'category/category': 'app/web/page/category/category.vue',
    'about/about': 'app/web/page/about/about.vue',
  },
  cssModule: {
      include: ['app/web/page', 'app/web/component'],
  },
  alias: {
      app: './app',
  },
  loaders: {
      scss: true,
  },
  plugins: [
    { imagemini: false }
  ]
};
