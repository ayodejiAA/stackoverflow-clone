import debug from 'debug';
import express from 'express';

const debugLog: debug.IDebugger = debug('app:router');

export abstract class CommonRoutesConfig {
  protected router: express.Router;

  constructor(
    private readonly name: string,
    readonly app: express.Application,
  ) {
    this.router = express.Router();
    this.routes();

    this.app.use('/api/v1', this.router);
    debugLog(`Routes configured for ${name}`);
  }

  public getName(): string {
    return this.name;
  }

  abstract routes(): void;
}
