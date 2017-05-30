/**
 * Created by count on 30/05/17.
 */
// @flow
import Sequelize from 'sequelize';

export default connect => connect.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  alias: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  surName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    // TODO: important!! make hash one!!!
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  modifiedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
