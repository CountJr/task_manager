// @flow

export default (router, { User, Task }) => {
  router
    .get('users', '/users', async (ctx) => {
      ctx.render('users');
    })
}