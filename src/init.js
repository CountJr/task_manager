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
    createdAt: new Date(),
    modifiedAt: new Date(),
  });
  User.create({
    email: 'bar@example.com',
    alias: 'bar',
    firstname: 'Brian',
    lastname: 'Doh',
    password: 'qwerty',
    createdAt: new Date(),
    modifiedAt: new Date(),
  });
};

export default async () => {
  const models = getModels(connect);
  await Promise.all(Object.values(models).map(model => model.sync({ force: true })));
  await addSomeData(models);
  //
};
