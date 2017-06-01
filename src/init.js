/**
 * Created by count on 30/05/17.
 */
// @flow

import connect from './db';
import getModels from './models';

const addSomeData = async ({ User }) => {
  User.create({
    email: 'some@example.com',
    alias: 'foo',
    firstname: 'John',
    lastname: 'O\'Brian',
    password: '123456',
  });
  User.create({
    email: 'bar@example.com',
    alias: 'bar',
    firstname: 'Brian',
    lastname: 'Doh',
    password: 'qwerty',
  });
};

export default async () => {
  const models = getModels(connect);
  await Promise.all(Object.values(models).map((model: Object)=>
    model.sync({force: true})
  ));
  await addSomeData(models);
  //
};
