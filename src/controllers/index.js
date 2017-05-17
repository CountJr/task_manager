// @flow
import main from './main';

const controllers = [main];

export default (router, container) =>
  controllers.forEach(controller => controller(router, container));
