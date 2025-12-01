
# DevVEla - NestJS CRUD API<p align="center">

  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

A robust RESTful API built with NestJS, featuring JWT authentication, MySQL database integration with SSL support for Aiven cloud database, and comprehensive CRUD operations for positions management.</p>



## 🚀 Features[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

- **JWT Authentication** - Secure signup and login with access & refresh tokens

- **MySQL Integration** - Cloud-ready with SSL support for Aiven MySQL  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

- **CRUD Operations** - Complete Create, Read, Update, Delete for positions    <p align="center">

- **TypeScript** - Fully typed for better development experience<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

- **Environment Configuration** - Flexible configuration via .env files<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

- **Password Security** - bcrypt hashing with salt rounds<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>

- **Protected Routes** - JWT guard for authorized endpoints<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>

<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>

## 📋 Prerequisites<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>

<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>

- Node.js 18+   <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>

- npm or yarn    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>

- MySQL database (Aiven cloud or local)  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>

- Git</p>

## ☁️ Persistent file storage (Cloudinary)

Local disk uploads on Render disappear after every deploy or restart. To keep user files intact we now stream uploads to Cloudinary. Add the following secrets to your backend `.env` (Render → Environment tab):

```
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
# Optional: customize the folder that stores all uploads
CLOUDINARY_FOLDER=crud-adet-storage
```

> **Heads up:** the `/files/download/:id` endpoint now proxies files from Cloudinary, so previews and downloads continue working even after the server restarts.

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)

## 🛠️ Installation  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->



1. **Clone the repository**## Description

   ```bash

   git clone https://github.com/Goriee/CrudAdet.git[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

   cd CrudAdet

   ```## Project setup



2. **Install dependencies**```bash

   ```bash$ npm install

   npm install --legacy-peer-deps```

   ```

   > Note: `--legacy-peer-deps` is required due to peer dependency conflicts between NestJS v11 packages## Configure database (Aiven MySQL)



3. **Configure environment variables**This project supports Aiven MySQL with SSL.

   

   Create a `.env` file in the root directory:1. Copy `.env.example` to `.env` and fill in your credentials from Aiven console.

   ```env

   # Database Configuration```

   DATABASE_HOST=mysql-3bc5f3b2-gbox-098a.d.aivencloud.comDATABASE_HOST=mysql-xxxxx.aivencloud.com

   DATABASE_PORT=18081DATABASE_PORT=18081

   DATABASE_USER=avnadminDATABASE_USER=avnadmin

   DATABASE_PASSWORD=your_password_hereDATABASE_PASSWORD=<your_password>

   DATABASE_NAME=defaultdbDATABASE_NAME=defaultdb

   DATABASE_SSL_MODE=REQUIRED

   # SSL Configuration (for Aiven)DATABASE_SSL_CA_PATH=./aiven-ca.pem

   DATABASE_SSL_MODE=REQUIRED```

   DATABASE_SSL_CA_PATH=C:\Users\Administrator\Desktop\DevVEla\ca.pem

   2. Download the CA certificate from the Aiven console (Show > Download) and save it as `aiven-ca.pem` in the project root, or update `DATABASE_SSL_CA_PATH` with the correct path.

   # JWT Secrets

   JWT_SECRET=your_jwt_secret_here3. Create the required tables (run once):

   JWT_REFRESH_SECRET=your_jwt_refresh_secret_here

   ```sql

   # Optional: Custom Table NamesCREATE TABLE IF NOT EXISTS users (

   USERS_TABLE=users  id INT AUTO_INCREMENT PRIMARY KEY,

   POSITIONS_TABLE=positions  username VARCHAR(255) NOT NULL UNIQUE,

   ```  password VARCHAR(255) NOT NULL,

  refreshToken VARCHAR(255) NULL

4. **SSL Certificate Setup (for Aiven)**);

   

   Download the CA certificate from your Aiven console and save it as `ca.pem` in the project root directory.CREATE TABLE IF NOT EXISTS positions (

  id INT AUTO_INCREMENT PRIMARY KEY,

5. **Database Schema**  positionCode VARCHAR(50) NOT NULL,

     positionName VARCHAR(255) NOT NULL,

   Ensure your MySQL database has the following tables:  userId INT NOT NULL

);

   **Users Table:**```

   ```sql

   CREATE TABLE users (## Compile and run the project

     id INT AUTO_INCREMENT PRIMARY KEY,

     username VARCHAR(255) NOT NULL UNIQUE,```bash

     email VARCHAR(255),# development

     password VARCHAR(255) NOT NULL,$ npm run start

     firstName VARCHAR(255),

     lastName VARCHAR(255),# watch mode

     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,$ npm run start:dev

     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

   );# production mode

   ```$ npm run start:prod

```

   **Positions Table:**

   ```sqlThe server reads `PORT` from `.env` (default 3000) and logs `Database Successfully Connected` on successful DB connection.

   CREATE TABLE positions (

     position_id INT AUTO_INCREMENT PRIMARY KEY,## Run tests

     position_code VARCHAR(50) NOT NULL,

     position_name VARCHAR(255) NOT NULL,```bash

     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,# unit tests

     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP$ npm run test

   );

   ```# e2e tests

$ npm run test:e2e

## 🏃‍♂️ Running the Application

# test coverage

**Development mode:**$ npm run test:cov

```bash```

npm run start:dev

```## Deployment



**Production mode:**When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

```bash

npm run buildIf you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

npm run start:prod

``````bash

$ npm install -g @nestjs/mau

The API will be available at `http://localhost:3000`$ mau deploy

```

## 📚 API Documentation

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

### Base URL

```## Resources

http://localhost:3000

```Check out a few resources that may come in handy when working with NestJS:



### Authentication Endpoints- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

#### 1. Signup- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).

Create a new user account.- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.

- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

**Endpoint:** `POST /auth/signup`- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).

**Request Body:**- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

```json

{## Support

  "username": "alice",

  "password": "password123",Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

  "email": "alice@example.com",

  "firstName": "Alice",## Stay in touch

  "lastName": "Smith"

}- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)

```- Website - [https://nestjs.com](https://nestjs.com/)

- Twitter - [@nestframework](https://twitter.com/nestframework)

**Response (201 Created):**

```json## License

{

  "id": 1,Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

  "username": "alice",
  "email": "alice@example.com",
  "firstName": "Alice",
  "lastName": "Smith",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

#### 2. Login
Authenticate and receive JWT tokens.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "username": "alice",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Token Expiry:**
- Access Token: 15 minutes
- Refresh Token: 7 days

> ⚠️ **Note:** Access tokens expire after 15 minutes. Users must re-login to obtain new tokens.

### Positions Endpoints (Protected)

All positions endpoints require JWT authentication. Include the access token in the Authorization header:
```
Authorization: Bearer <your_access_token>
```

#### 1. Create Position
**Endpoint:** `POST /positions`

**Request Body:**
```json
{
  "positionCode": "DEV001",
  "positionName": "Senior Developer"
}
```

**Response (201 Created):**
```json
{
  "position_id": 1,
  "position_code": "DEV001",
  "position_name": "Senior Developer",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

#### 2. Get All Positions
**Endpoint:** `GET /positions`

**Response (200 OK):**
```json
[
  {
    "position_id": 1,
    "position_code": "DEV001",
    "position_name": "Senior Developer",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  },
  {
    "position_id": 2,
    "position_code": "MGR001",
    "position_name": "Project Manager",
    "created_at": "2024-01-15T11:00:00.000Z",
    "updated_at": "2024-01-15T11:00:00.000Z"
  }
]
```

#### 3. Get Position by ID
**Endpoint:** `GET /positions/:id`

**Response (200 OK):**
```json
{
  "position_id": 1,
  "position_code": "DEV001",
  "position_name": "Senior Developer",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

#### 4. Update Position
**Endpoint:** `PATCH /positions/:id`

**Request Body:**
```json
{
  "positionCode": "DEV002",
  "positionName": "Lead Developer"
}
```

**Response (200 OK):**
```json
{
  "position_id": 1,
  "position_code": "DEV002",
  "position_name": "Lead Developer",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T12:00:00.000Z"
}
```

#### 5. Delete Position
**Endpoint:** `DELETE /positions/:id`

**Response (200 OK):**
```json
{
  "message": "Position deleted successfully"
}
```

## 🧪 Testing with Postman

### Setup

1. **Import the collection** or create a new collection with the endpoints above
2. **Create an environment** with the following variables:
   - `base_url`: `http://localhost:3000`
   - `access_token`: (will be set automatically after login)

### Testing Flow

1. **Test Signup**
   - Send POST request to `{{base_url}}/auth/signup`
   - Verify user is created

2. **Test Login**
   - Send POST request to `{{base_url}}/auth/login`
   - Copy the `accessToken` from response
   - Save it to your environment variable `access_token`
   - Or manually add to Authorization header for subsequent requests

3. **Test Positions CRUD**
   - Add Authorization header to all positions requests:
     ```
     Key: Authorization
     Value: Bearer {{access_token}}
     ```
   
   - **Create**: POST to `{{base_url}}/positions`
   - **Read All**: GET to `{{base_url}}/positions`
   - **Read One**: GET to `{{base_url}}/positions/1`
   - **Update**: PATCH to `{{base_url}}/positions/1`
   - **Delete**: DELETE to `{{base_url}}/positions/1`

### Common Issues

- **401 Unauthorized**: Token expired (15m limit) or missing. Re-login to get new token.
- **500 Internal Server Error**: Check server logs for database connection or query errors.
- **404 Not Found**: Position ID doesn't exist in database.

## 🗂️ Project Structure

```
DevVEla/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── auth.controller.ts   # Auth endpoints (signup, login)
│   │   ├── auth.service.ts      # Auth business logic
│   │   └── auth.module.ts       # Auth module definition
│   ├── config/
│   │   └── jwt.ts               # JWT configuration
│   ├── database/
│   │   ├── database.module.ts   # Database module
│   │   └── database.service.ts  # MySQL connection with SSL
│   ├── guards/
│   │   └── guard.ts             # JWT authentication guard
│   ├── positions/               # Positions CRUD module
│   │   ├── positions.controller.ts
│   │   ├── positions.service.ts
│   │   └── positions.module.ts
│   ├── app.module.ts            # Root module
│   └── main.ts                  # Application entry point
├── test/                        # E2E tests
├── .env                         # Environment variables (not in git)
├── ca.pem                       # SSL certificate (not in git)
├── package.json
└── README.md
```

## 🔒 Security

- **Password Hashing**: Uses bcrypt with 10 salt rounds
- **JWT Tokens**: HS256 algorithm with configurable secrets
- **SSL/TLS**: Supports SSL connections to MySQL (required for Aiven)
- **Environment Variables**: Sensitive data stored in .env (excluded from git)
- **Input Validation**: NestJS built-in validation pipes

### Security Best Practices

1. Never commit `.env` or `ca.pem` files to version control
2. Use strong JWT secrets (minimum 32 characters)
3. Rotate JWT secrets regularly in production
4. Use HTTPS in production environments
5. Implement rate limiting for auth endpoints
6. Add input sanitization for SQL injection prevention

## 🚢 Deployment

### Heroku Deployment

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set DATABASE_HOST=your_host
   heroku config:set DATABASE_PORT=18081
   heroku config:set DATABASE_USER=your_user
   heroku config:set DATABASE_PASSWORD=your_password
   heroku config:set DATABASE_NAME=defaultdb
   heroku config:set DATABASE_SSL_MODE=REQUIRED
   heroku config:set JWT_SECRET=your_secret
   heroku config:set JWT_REFRESH_SECRET=your_refresh_secret
   ```

3. **Add SSL certificate**
   ```bash
   heroku config:set DATABASE_SSL_CA="$(cat ca.pem)"
   ```
   Update `database.service.ts` to read from env var instead of file:
   ```typescript
   const ca = process.env.DATABASE_SSL_CA || fs.readFileSync(sslCaPath);
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install --legacy-peer-deps
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "run", "start:prod"]
   ```

2. **Build and run**
   ```bash
   docker build -t devvela .
   docker run -p 3000:3000 --env-file .env devvela
   ```

### Railway Deployment

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on git push

### Render Deployment

Render offers free tier hosting for your NestJS application with automatic deploys from GitHub.

#### Prerequisites
- GitHub repository (already done ✅)
- Render account (sign up at https://render.com)
- Your Aiven MySQL connection details

#### Step-by-Step Guide

1. **Create a Render Account**
   - Go to https://render.com
   - Sign up with your GitHub account

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select your repository: `Goriee/CrudAdet`
   - Click "Connect"

3. **Configure the Service**
   
   **Basic Settings:**
   - **Name**: `devvela-api` (or your preferred name)
   - **Region**: Choose closest to your Aiven MySQL region
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Runtime**: `Node`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Instance Type**: `Free` (or paid tier for better performance)

4. **Add Environment Variables**
   
   In the "Environment" section, click "Add Environment Variable" and add:
   
   ```
   DATABASE_HOST=mysql-3bc5f3b2-gbox-098a.d.aivencloud.com
   DATABASE_PORT=18081
   DATABASE_USER=avnadmin
   DATABASE_PASSWORD=<your_aiven_password>
   DATABASE_NAME=defaultdb
   DATABASE_SSL_MODE=REQUIRED
   JWT_SECRET=<your_jwt_secret_32_chars_minimum>
   JWT_REFRESH_SECRET=<your_jwt_refresh_secret_32_chars_minimum>
   NODE_ENV=production
   PORT=3000
   ```

5. **Handle SSL Certificate**
   
   Since Render doesn't allow direct file uploads during build, you have two options:

   **Option A: Use Environment Variable (Recommended)**
   
   Add the CA certificate as an environment variable:
   ```
   DATABASE_SSL_CA=-----BEGIN CERTIFICATE-----
   MIIEQTCCAqmgAwIBAgIUc...
   -----END CERTIFICATE-----
   ```
   
   Then update `src/database/database.service.ts`:
   ```typescript
   const sslRequired = process.env.DATABASE_SSL_MODE === 'REQUIRED';
   const sslCaPath = process.env.DATABASE_SSL_CA_PATH || './ca.pem';
   
   let ssl: any = undefined;
   if (sslRequired) {
     if (process.env.DATABASE_SSL_CA) {
       // Use certificate from environment variable (for Render/Heroku)
       ssl = { ca: process.env.DATABASE_SSL_CA };
     } else {
       // Use certificate from file (for local development)
       ssl = { ca: fs.readFileSync(sslCaPath) };
     }
   }
   ```

   **Option B: Commit Certificate to Private Repo**
   
   If your repository is private, you can commit the CA certificate:
   ```bash
   git add ca.pem -f
   git commit -m "Add CA certificate for Render deployment"
   git push origin main
   ```
   
   Add environment variable:
   ```
   DATABASE_SSL_CA_PATH=./ca.pem
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Wait for the deployment to complete (3-5 minutes)
   - You'll get a URL like: `https://devvela-api.onrender.com`

7. **Test Your Deployment**
   
   Use Postman or curl to test:
   ```bash
   # Test signup
   curl -X POST https://devvela-api.onrender.com/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","password":"test123"}'
   
   # Test login
   curl -X POST https://devvela-api.onrender.com/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","password":"test123"}'
   ```

#### Automatic Deploys

Once configured, Render will automatically deploy whenever you push to the `main` branch:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

#### Monitoring & Logs

- View logs: Dashboard → Your Service → Logs tab
- Monitor performance: Dashboard → Your Service → Metrics tab
- View deployments: Dashboard → Your Service → Events tab

#### Free Tier Limitations

⚠️ **Important Notes about Render Free Tier:**
- Service **spins down after 15 minutes of inactivity**
- **Cold start**: First request after spin down takes 30-60 seconds
- 750 hours/month of free runtime (essentially unlimited for single service)
- Consider upgrading to paid tier ($7/month) for always-on service

#### Troubleshooting

**Database Connection Issues:**
- Verify Aiven allows connections from Render IPs
- Check DATABASE_SSL_MODE and certificate configuration
- View logs for specific error messages

**Build Failures:**
- Ensure `--legacy-peer-deps` is in build command
- Check Node.js version compatibility
- Review build logs for specific errors

**Application Not Starting:**
- Verify `npm run start:prod` works locally
- Check all environment variables are set correctly
- Review application logs in Render dashboard

**Cold Start Timeout:**
- Free tier services sleep after inactivity
- First request wakes the service (30-60s delay)
- Upgrade to paid tier for always-on service

#### Render vs Other Platforms

| Feature | Render Free | Heroku Free | Railway Free |
|---------|-------------|-------------|--------------|
| Cost | $0 | Discontinued | $5 credit/month |
| Spin Down | After 15min | N/A | No |
| SSL | ✅ Automatic | ✅ | ✅ |
| Custom Domain | ✅ | ✅ | ✅ |
| Auto Deploy | ✅ | ✅ | ✅ |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Goriee** - [GitHub Profile](https://github.com/Goriee)

## 🐛 Known Issues

1. **RefreshToken Column**: The users table doesn't have a `refreshToken` column. The code handles this gracefully by skipping the DB update.
2. **Token Expiry**: Access tokens expire after 15 minutes. Users must re-login frequently. Consider implementing refresh token rotation in production.
3. **Schema Case**: Database uses snake_case (position_code), API uses camelCase (positionCode). Mapping handled in service layer.

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions

## 🎯 Future Enhancements

- [ ] Implement refresh token rotation
- [ ] Add email verification for signup
- [ ] Implement password reset functionality
- [ ] Add pagination for positions list
- [ ] Add filtering and sorting for positions
- [ ] Implement role-based access control (RBAC)
- [ ] Add API rate limiting
- [ ] Add Swagger/OpenAPI documentation
- [ ] Implement logging with Winston
- [ ] Add unit and integration tests
- [ ] Add Docker Compose for local development
- [ ] Implement database migrations

---

Built with ❤️ using NestJS
