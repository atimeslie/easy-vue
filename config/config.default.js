'use strict';
const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};

  exports.apiHost = 'api.feedback.sogou'
  // exports.apiHost = 'europa-test.thanos.sogou'
  //   exports.apiHost = 'testapi.feedback.sogou'
  //   exports.apiHost = '10.129.24.186:7777'

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.vuessr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html'),
    renderOptions: {
      basedir: path.join(app.baseDir, 'app/view')
    },
    injectRes:[
      {
        url: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.2/css/swiper.min.css'
      },
      {
        url: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.2/js/swiper.min.js'
      }
    ]
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'locals',
    'access'
  ];

  exports.security = {
    // todo 暂时关闭
    csrf: {
      enable: false,
      // ignoreJSON: false,
      // cookieName: 'csrfToken',
      // sessionName: 'csrfToken',
      // headerName: 'x-csrf-token'
    },
    // xframe: {
    //   enable: false,
    // },
  };

  return exports;
};
