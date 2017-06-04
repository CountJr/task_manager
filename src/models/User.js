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
        notEmpty: {
          args: true,
          msg: "Alias can't be empty"
        },
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
        is: {
          notEmpty: {
            args: true,
            msg: "Name can't be empty"
          },
          args:/^[a-z'\- ]+$/i,
          msg: "Must contain only letters, ', - and space",
        },
      },
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: {
          notEmpty: {
            args: true,
            msg: "Name can't be empty"
          },
          args:/^[a-z'\- ]+$/i,
          msg: "Must contain only letters, ', - and space",
        },
      },
    },
    password: {
      // TODO: important!! make hash one!!!
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args:[6, +Infinity],
          msg: "Password must have at least 6 symbols",
        },
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
