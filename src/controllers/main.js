// @flow
import type Router from 'koa-router';

export default (router: Router) => {
  router
    .get('main', '/', async (ctx) => {
      ctx.render('main/index');
    });
    // .get('/date', (ctx) => {
    //   ctx.body = new Date();
    // });
};
