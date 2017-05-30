/**
 * Created by count on 30/05/17.
 */
// @flow

import getUsers from './User';
import getPosition from './Position';


export default (connect) => {
  const models = {
    User: getUsers(connect),
    Position: getPosition(connect),
  };
  return models;
};
