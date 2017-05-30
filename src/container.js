/**
 * Created by count on 30/05/17.
 */
// @flow
import connect from './db';
import getModels from './models';

const models = getModels(connect);

export default { ...models };
