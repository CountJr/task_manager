// @flow

export default (router) => {
  router
    .get('index', '/', (ctx) => {
      ctx.render('main/index');
    })
    .get('/date', (ctx) => {
      ctx.body = new Date();
    });
};
