/**
 * Created by count on 30/05/17.
 */
// @flow

import getUsers from './User';
import getPosition from './Position';
import type Sequelize from "sequelize";


export default (connect: Sequelize) => ({
    User: getUsers(connect),
    Position: getPosition(connect),
  });
