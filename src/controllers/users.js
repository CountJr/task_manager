// @flow
import buildFormObj from '../lib/formObjectBuilder';
import type Router from 'koa-router';

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
      console.log(user.password, form);
      try {
        if (user.password === form.oldPassword){
          await user.update(form);
          ctx.redirect(`/users/${ctx.state.userId}`);
        } else {
          // FIXME: build new object with 'password error' addition
          throw new Error('wrong password');
        }
      } catch (e) {
        ctx.render('users/settings', { f: buildFormObj(user, e) });
      }
    })
    .delete('usersDestroy', '/users', async (ctx) => {
      // TODO: delete user
      ctx.render(router.url('main'));
    })
    .get('usersShow', '/users/:id', async (ctx) => {
      const user = await User.findById(ctx.params.id);
      ctx.render('users/profile', { user });
    })
};
