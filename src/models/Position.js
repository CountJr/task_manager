/**
 * Created by count on 30/05/17.
 */
// @flow

import Sequelize from 'sequelize';

export default connect => connect.define('position', {
  name: {
    type: Sequelize.STRING
  },
});