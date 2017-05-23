// @flow

export default (router, { User }) => {
  router
    .delete('session', '/session', (ctx) => {
      ctx.session = null;
      ctx.redirect('/');
    })
}