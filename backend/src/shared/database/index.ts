import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { config } from '../../config';
import { Logger } from '../logger';

export interface LocalDbData {
  projectRequests: any[];
  contactMessages: any[];
  adminNotes: any[];
}

const DATA_DIR = path.resolve(__dirname, '../../../data');
const DATA_FILE = path.join(DATA_DIR, 'local_db.json');

export class Database {
  private static isConnectedToMongo = false;

  static async init() {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE)) {
      const initialData: LocalDbData = {
        projectRequests: [],
        contactMessages: [],
        adminNotes: [],
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    }

    if (config.mongodbUri) {
      try {
        await mongoose.connect(config.mongodbUri, {
          serverSelectionTimeoutMS: 8000,
        });
        this.isConnectedToMongo = true;
        Logger.info(`Connected successfully to MongoDB Atlas (DB: "${mongoose.connection.db?.databaseName}").`);

        // Synchronize local JSON data to MongoDB Atlas on startup
        await this.syncLocalToMongo();
      } catch (err: any) {
        this.isConnectedToMongo = false;
        Logger.error(`MongoDB Atlas connection FAILED: ${err.message}. (Check if MONGODB_URI is correct and IP Access is set to 0.0.0.0/0 in Atlas). Falling back to local file persistence.`);
      }
    } else {
      Logger.warn('MONGODB_URI is NOT configured in environment variables! Data will only be saved in temporary container files, NOT MongoDB Atlas.');
    }
  }

  private static async syncLocalToMongo() {
    try {
      const localData = this.readLocalDb();
      if (localData.projectRequests && localData.projectRequests.length > 0) {
        const { ProjectRequestModel } = await import('../../modules/projectRequests/projectRequest.model');
        for (const item of localData.projectRequests) {
          await ProjectRequestModel.updateOne({ id: item.id }, { $set: item }, { upsert: true });
        }
        Logger.info(`Synced ${localData.projectRequests.length} project request(s) from local_db to MongoDB Atlas.`);
      }

      if (localData.contactMessages && localData.contactMessages.length > 0) {
        const { ContactMessageModel } = await import('../../modules/contactMessages/contactMessage.model');
        for (const msg of localData.contactMessages) {
          await ContactMessageModel.updateOne({ id: msg.id }, { $set: msg }, { upsert: true });
        }
        Logger.info(`Synced ${localData.contactMessages.length} contact message(s) from local_db to MongoDB Atlas.`);
      }
    } catch (err: any) {
      Logger.warn(`Initial sync from local to MongoDB skipped or encountered error: ${err.message}`);
    }
  }

  static isMongoActive(): boolean {
    return this.isConnectedToMongo;
  }

  static readLocalDb(): LocalDbData {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        return { projectRequests: [], contactMessages: [], adminNotes: [] };
      }
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return { projectRequests: [], contactMessages: [], adminNotes: [] };
    }
  }

  static writeLocalDb(data: LocalDbData) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err: any) {
      Logger.error(`Failed to write local database: ${err.message}`);
    }
  }
}
