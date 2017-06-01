// @flow
import buildFormObj from '../lib/formObjectBuilder';
import type Router from 'koa-router';

export default (router: Router, { User }: Object) => {
  // TODO: delete user, full refactor of this section. now it's a mess
  router
    .get('users', '/users', async (ctx) => {
      const users = await User.findAll();
      ctx.render('users', { users });
    })
    .get('settings', '/user/settings', async (ctx) => {
      const user = await User.findById(ctx.state.userId);
      ctx.render('users/settings', { f: buildFormObj(user) });
    })
    // TODO: important! encrypt password + some mess with profiles, wat da hell with throw?
    .post('settings', '/user/settings', async (ctx) => {
      const form = ctx.request.body.form;
      const user = await User.findById(ctx.state.userId);
      console.log(user.password, form);
      try {
        if (user.password === form.oldPassword){
          await user.update(form);
          console.log('boom2');
          ctx.redirect(router.url('users'));
        }
        throw new Error('wrong password');
      } catch (e) {
        console.log('boom3');
        ctx.render('users/settings', { f: buildFormObj(user, e) });
      }
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
