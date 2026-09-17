import app from './app';
import { config } from './config';
import { Database } from './shared/database';
import { Logger } from './shared/logger';

async function startServer() {
  try {
    // Initialize Database
    await Database.init();

    const server = app.listen(config.port, () => {
      Logger.info(`Portfolio Backend API running on http://localhost:${config.port}`);
      Logger.info(`Environment: ${config.nodeEnv}`);
      Logger.info(`Default Admin Account: ${config.admin.email}`);
    });

    // Graceful shutdown
    const shutdown = () => {
      Logger.info('Received termination signal. Closing HTTP server gracefully...');
      server.close(() => {
        Logger.info('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (err: any) {
    Logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
}

startServer();
