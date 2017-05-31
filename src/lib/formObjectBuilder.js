/**
 * Created by count on 31/05/17.
 */
// @flow

import _ from 'lodash';

export default (object, error = { errors: [] }) => ({
  name: 'form',
  object,
  errors: _.groupBy(error.errors, 'path'),
});
