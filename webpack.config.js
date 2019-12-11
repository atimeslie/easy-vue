'use strict';

module.exports = {
  entry: {
    'index/index': 'app/web/page/index/index.vue',
    'category/category': 'app/web/page/category/category.vue',
    'about/about': 'app/web/page/about/about.vue',
  },
  alias: {
      app: './app',
  },
  cssModule: {
      include: ['app/web/page', 'app/web/component'],
  },
  loaders:{ scss: true},
  plugins: [
    { imagemini: false }
  ]
};
