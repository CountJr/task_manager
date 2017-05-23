// @flow
import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import middleware from 'koa-webpack';
import session from 'koa-session';
import _ from 'lodash';
import path from 'path';
// import rollbar from 'rollbar';

import addRoutes from './controllers';
import getWebpackConfig from '../webpack.config.babel';

export default () => {
  // rollbar.init('8a0f822a03c149d68e794345b540b40b');

  // rollbar.reportMessage("Hello world!");

  const app = new Koa();

  app.keys = ['jopa'];
  const CONFIG = { key: 'koases', signed: true };

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
    // TODO: keep session in sequelize: koa-generic-session-sequelize + koa-generic-session
    .use(session(CONFIG, app))
    .use(async (ctx, next) => {
      // ignore favicon
      if (ctx.path === '/favicon.ico') return;

      ctx.state = {
        isSignedIn: () => Boolean(ctx.session.userID),
        userID: ctx.session.userID,
      }

      // delete session: ctx.session = null;
      await next();
    })
    .use(middleware({
      config: getWebpackConfig(),
    }))
    .use(router.routes())
    .use(router.allowedMethods());

  pug.use(app);

  return app;
};
