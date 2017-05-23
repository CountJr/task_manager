// @flow
import main from './main';
import users from './users';

const controllers = [main, users];

export default (router, container) =>
  controllers.forEach(controller => controller(router, container));
