// @flow
import type Router from 'koa-router';
import buildFormObj from '../lib/formObjectBuilder';

export default (router: Router, { User }: Object) => {
  router
    .get('newSession', '/session/new', async (ctx) => {
      const data = {};
      ctx.render('sessions/new', { f: buildFormObj(data) });
    })
    // TODO: important! encrypt password + email or alias login
    .post('session', '/session', async (ctx) => {
      const { email, password } = ctx.request.body.form;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user && user.password === password) {
        ctx.session.userId = user.id;
        ctx.session.userAlias = user.alias;
        ctx.redirect(router.url('main'));
        return;
      }

      // ctx.flash.set('email or password were wrong');
      ctx.render('sessions/new', { f: buildFormObj({ email }) });
    })
    .delete('session', '/session', (ctx) => {
      ctx.session = null;
      ctx.redirect(router.url('main'));
    });
};
