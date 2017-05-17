// @flow

export default (router) => {
  router
    .get('root', '/', (ctx) => {
      ctx.render('main/index');
    })
    .get('/date', (ctx) => {
      ctx.body = new Date();
    });
};
