/**
 * Created by count on 30/05/17.
 */
// @flow
import Sequelize from 'sequelize';

export default (connect: Sequelize) => connect.define('users', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email can't be empty"
        },
        isEmail: {
          args: true,
          msg: "Must be a valid email like 'user@example.com'"
        },
      }
    },
    alias: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "Must contain only letters and numbers",
        },
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
    }
  }, {
    getterMethods: {
      fullName: function () {
        return `${this.firstname} '${this.alias}' ${this.lastname}`;
      }
    },
    paranoid: true,
    freezeTableName: true,
  });
