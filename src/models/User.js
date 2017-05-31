/**
 * Created by count on 30/05/17.
 */
// @flow
import Sequelize from 'sequelize';

export default connect => connect.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  alias: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isAlphanumeric: true,
    }
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-z'\- ]+$/i,
    }
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-z'\- ]+$/i,
    }
  },
  password: {
    // TODO: important!! make hash one!!!
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [6, +Infinity],
    }
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  modifiedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});
