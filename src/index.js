// @flow

import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import _ from 'lodash';
import path from 'path';
// import rollbar from 'rollbar';

import addRoutes from './controllers';

export default () => {
  // rollbar.init('8a0f822a03c149d68e794345b540b40b');

  // rollbar.reportMessage("Hello world!");

  const app = new Koa();

  app.keys = ['some1', 'some2'];
  const config = { signed: false };

  const container = {};
  const router = new Router();
  addRoutes(router, container);


  const pug = new Pug({
    viewPath: path.join(__dirname, 'views'),
    debug: true,
    pretty: true,
    compileDebug: true,
    locals: [],
    basedir: path.join(__dirname, 'views'),
    helperPath: [
      { _ },
      { urlFor: (...args) => router.url(...args) },
    ],
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());
  pug.use(app);

  return app;
};
