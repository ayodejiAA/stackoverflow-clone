import { Application } from 'express';

import { CommonRoutesConfig } from '../common/';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(readonly app: Application) {
    super('users', app);
  }

  routes(): void {
    // Add routers
  }
}
