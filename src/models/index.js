/**
 * Created by count on 30/05/17.
 */
// @flow

import type Sequelize from "sequelize";
import getUsers from './User';
// import getPosition from './Position';


export default (connect: Sequelize) => ({
    User: getUsers(connect),
    // Position: getPosition(connect),
  });
