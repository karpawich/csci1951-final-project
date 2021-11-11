const useDebug = require('debug');
const chalk = require('chalk');
const db = require('./util/db');

const debug = useDebug('core');

/**
 * Initializes each primary module of the system.
 */

(async () => {
  debug('Initializing system...');

  // Initialize the database connection
  await db();

  try {
    debug(chalk.greenBright('System initialized.'));
  } catch (e) {
    debug(chalk.redBright('Initialization failed.'));
  }
})();
