// @flow
import main from './main';
import users from './users';
import sessions from './sessions';

const controllers = [main, users, sessions];

export default (router, container) =>
  controllers.forEach(controller => controller(router, container));
