// @flow
import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import middleware from 'koa-webpack';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import _ from 'lodash';
import path from 'path';
// import rollbar from 'rollbar';

import addRoutes from './controllers';
import getWebpackConfig from '../webpack.config.babel';
import container from './container';

export default () => {
  // rollbar.init('8a0f822a03c149d68e794345b540b40b');

  // rollbar.reportMessage("Hello world!");

  const app = new Koa();

  app.keys = ['jopa'];
  const CONFIG = { key: 'koases', signed: true };

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
    .use(bodyParser())
    .use(methodOverride((req) => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        return req.body._method;
      }
    }))
    .use(async (ctx, next) => {
      // ignore favicon
      if (ctx.path === '/favicon.ico') return;

      ctx.state = {
        isSignedIn: () => Boolean(ctx.session.userId),
        userId: ctx.session.userId,
      }

      // ctx.session.userId = 15;

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
