// @flow
import buildFormObj from '../lib/formObjectBuilder';
import type Router from 'koa-router';

export default (router: Router, { User }: Object) => {
  // TODO: delete user, user settings
  router
    .get('users', '/users', async (ctx) => {
      const users = await User.findAll();
      ctx.render('users', { users });
    })
    .get('profile', '/user/:id', async (ctx) => {
      const user = await User.findById(ctx.params.id);
      ctx.render('users/profile', { user });
    })
    .get('addUser', '/users/new', async (ctx) => {
      const user = User.build();
      ctx.render('users/new', { f: buildFormObj(user) });
    })
    .post('users', '/users', async (ctx) => {
      const form = ctx.request.body.form;
      const user = User.build(form);
      try {
        await user.save();
        // ctx.flash.set('User has been created');
        ctx.redirect(router.url('users'));
      } catch (e) {
        ctx.render('users/new', { f: buildFormObj(user, e) });
      }
    });
};
