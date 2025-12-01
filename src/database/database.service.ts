import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: mysql.Pool;

  constructor() {
    const port = process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT, 10)
      : 3306;

    // SSL support for providers like Aiven, Render, Heroku
    const sslMode = (process.env.DATABASE_SSL_MODE || '').toUpperCase();
    const sslRequired = sslMode === 'REQUIRED' || process.env.DATABASE_SSL === 'true';
    const sslCaPath = process.env.DATABASE_SSL_CA_PATH;
    const sslCaContent = process.env.DATABASE_SSL_CA; // Certificate content from env var

    // Keep ssl type as any to avoid type conflicts across mysql2 versions
    let ssl: any | undefined = undefined;
    if (sslRequired) {
      try {
        if (sslCaContent) {
          // Use certificate from environment variable (for Render/Heroku)
          ssl = { ca: sslCaContent };
          console.log('Using SSL certificate from DATABASE_SSL_CA environment variable');
        } else if (sslCaPath) {
          // Use certificate from file (for local development)
          const ca = fs.readFileSync(path.resolve(sslCaPath), 'utf8');
          ssl = { ca };
          console.log(`Using SSL certificate from file: ${sslCaPath}`);
        } else {
          // If CA is not provided, try default trusted CAs
          // Some providers use public CAs trusted by Node; if not, they will require a CA file.
          ssl = { rejectUnauthorized: true };
          console.log('Using default trusted CAs for SSL connection');
        }
      } catch (e) {
        // Fall back to no SSL only if not strictly required
        if (sslRequired) {
          throw new Error(
            `Failed to read SSL CA file at ${sslCaPath}. Set DATABASE_SSL_CA_PATH to a valid path or disable SSL. ${(e as Error).message}`,
          );
        }
      }
    }

    this.pool = mysql.createPool({
      host: process.env.DATABASE_HOST as string,
      user: process.env.DATABASE_USER as string,
      password: process.env.DATABASE_PASSWORD as string,
      database: process.env.DATABASE_NAME as string,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      // Only include ssl property when defined; mysql2 treats undefined as no-ssl
      ...(ssl ? { ssl } : {}),
    });
  }

  async onModuleInit() {
    await this.testConnection();
  }

  private async testConnection() {
    try {
      const connection = await this.pool.getConnection();
      await connection.ping();
      connection.release();
      console.log('Database Successfully Connected');
    } catch (error: any) {
      console.error('Database connection failed:', error);
      throw new Error(`message: ${error.message}`);
    }
  }

  getPool() {
    return this.pool;
  }

  async query(sql: string, params?: any[]) {
    return this.pool.query(sql, params);
  }
}
