import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  private get usersTable() {
    return process.env.USERS_TABLE || 'users';
  }

  async login(username: string, password: string) {
    const [rows] = (await this.db
      .getPool()
      .execute(`SELECT * FROM ${this.usersTable} WHERE username = ?`, [
        username,
      ])) as any[];

    if (rows.length === 0) {
      throw new BadRequestException('Invalid Credentials');
    }

    const user = rows[0];
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    console.log(user, user.password);
    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid Credentials');
    }

    const payload = { userId: user.id, username: user.username };

    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'MISSING');
    console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET ? 'Set' : 'MISSING');

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    // Skip refreshToken DB update since the column doesn't exist in your schema
    // If you need refresh token persistence, add the column to your users table
    
    console.log('Login successful, returning tokens');
    const response = { accessToken, refreshToken };
    console.log('Response object:', JSON.stringify(response).substring(0, 100));
    return response;
  }

  async signup(username: string, password: string, email?: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(username, password);
      
      // Support optional email column
      if (email) {
        await this.db
          .getPool()
          .execute(
            `INSERT INTO ${this.usersTable} (username, password, email) VALUES(?, ?, ?)`,
            [username, hashedPassword, email],
          );
      } else {
        await this.db
          .getPool()
          .execute(
            `INSERT INTO ${this.usersTable} (username, password) VALUES(?, ?)`,
            [username, hashedPassword],
          );
      }

      return {
        message: 'Successfully created',
        data: { username, email },
      };
    } catch (error: any) {
      // Handle duplicate username error
      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        throw new BadRequestException('Username already exists. Please choose a different username.');
      }
      // Re-throw other errors
      throw error;
    }
  }

  async getAll() {
    const [rows] = await this.db
      .getPool()
      .execute(`SELECT * FROM ${this.usersTable}`);
    const data = rows as any[];
    if (data.length === 0) {
      throw new BadRequestException('No Data found');
    }

    return data;
  }

  async getOne(id: number) {
    const [rows] = await this.db
      .getPool()
      .execute(`SELECT * FROM ${this.usersTable} WHERE id = ?`, [id]);
    const data = rows as any[];
    if (data.length === 0) {
      throw new BadRequestException('No Data found');
    }

    return data;
  }

  async delete(id: number) {
    const [rows] = await this.db
      .getPool()
      .execute(`DELETE FROM ${this.usersTable} WHERE id = ?`, [id]);

    const { affectedRows } = rows as any;

    if (affectedRows === 0) {
      throw new BadRequestException('User not found');
    }

    return { message: 'succesfully deleted user' };
  }

  async update(id: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await this.db
      .getPool()
      .execute(
        `UPDATE ${this.usersTable} SET username = ?, password = ? WHERE id = ? `,
        [username, hashedPassword, id],
      );

    const { affectedRows } = rows as any;

    if (affectedRows === 0) {
      throw new BadRequestException('User not found');
    }

    return {
      message: 'User Updated succesfully',
      data: { username, hashedPassword },
    };
  }
}
