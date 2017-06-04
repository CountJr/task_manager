// @flow
import type Router from 'koa-router';
import buildFormObj from '../lib/formObjectBuilder';

export default (router: Router, { User }: Object) => {
  /*
        GET    /users      usersIndex    display a list of all users
        GET    /users/new  usersNew      return an HTML form for creating a new user
        POST   /users      usersCreate   create a new user
        GET    /users/edit usersEdit     return an HTML form for editing user
        PATCH  /users      usersUpdate   update a user
        DELETE /users      usersDestroy  delete a user
        GET    /users/:id  usersShow     display a specific user
   */
  router
    .get('usersIndex', '/users', async (ctx) => {
      const users = await User.findAll();
      ctx.render('users', { users });
    })

    .get('usersNew', '/users/new', async (ctx) => {
      const user = User.build();
      ctx.render('users/new', { f: buildFormObj(user) });
    })

    // TODO: important! encrypt password
    .post('usersCreate', '/users', async (ctx) => {
      const form = ctx.request.body.form;
      const user = User.build(form);
      try {
        await user.save();
        // ctx.flash.set('User has been created');
        ctx.redirect(router.url('usersShow', user.id));
      } catch (e) {
        user.password = '';
        ctx.render('users/new', { f: buildFormObj(user, e) });
      }
    })

    .get('usersEdit', '/users/edit', async (ctx) => {
      const user = await User.findById(ctx.state.userId);
      ctx.render('users/edit', { f: buildFormObj(user) });
    })

    .patch('usersUpdate', '/users', async (ctx) => {
      const form = ctx.request.body.form;
      const user = await User.findById(ctx.state.userId);
      try {
        await user.update(form);
        ctx.redirect(`/users/${ctx.state.userId}`);
      } catch (e) {
        user.password_confirmation = '';
        ctx.render('users/edit', { f: buildFormObj(user, e) });
      }
    })

    // TODO: test destroy functionality
    .delete('usersDestroy', '/users', async (ctx) => {
      const user = await User.findById(ctx.state.userId);
      await user.destroy();
      ctx.render(router.url('main'));
    })

    .get('usersShow', '/users/:id', async (ctx) => {
      const user = await User.findById(ctx.params.id);
      ctx.render('users/profile', { user });
    })
};
