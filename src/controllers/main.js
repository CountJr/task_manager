// @flow
import type Router from 'koa-router';

export default (router: Router) => {
  router
    .get('main', '/', async (ctx) => {

      // seqielize test
      // await User.sync({force: true}).then(() => {
      //   // Table created
      //   return User.create({
      //     firstName: 'John',
      //     lastName: 'Hancock'
      //   });
      // });
      //
      // console.log('-----');
      //
      // await User.findAll().then(users => {
      //   console.log('lala');
      //   console.log(users)
      // });
      // console.log('--/--');
      ///////////

      ctx.render('main/index');
    })
    // .get('/date', (ctx) => {
    //   ctx.body = new Date();
    // });
};
