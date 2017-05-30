/**
 * Created by count on 30/05/17.
 */
// @flow

import connect from './db';
import getModels from './models';

export default async () => {
  const models = getModels(connect);
  await Promise.all(Object.values(models).map(model => model.sync({ force: true })));
  //
};
