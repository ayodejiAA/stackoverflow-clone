import debug from 'debug';
import app from './app';

const debugLog: debug.IDebugger = debug('app:server');

const port = 3000;

app.listen(port, () => {
  debugLog('Application successfully started');
  debugLog(`Server running at http://localhost:${port}`);
});
