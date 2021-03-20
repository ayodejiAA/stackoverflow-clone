// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../config');

import { Sequelize } from 'sequelize';
import { NODE_ENV } from '../../environments';

const { database, username, password, ...restConfig } = config[NODE_ENV];
const sequelize = new Sequelize(database, username, password, restConfig);

export default sequelize;
