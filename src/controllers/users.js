// @flow

export default (router, { User, Task }) => {
  router
    .get('userList', '/users', async (ctx) => {
      ctx.render('users');
    })
}