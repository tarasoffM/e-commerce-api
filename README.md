# E-Commerce Web Application

## Overview

A full-stack e-commerce platform featuring a React frontend and a Node.js/Express backend. 

Browse products, manage carts, and check out securely, with PostgreSQL powering the data and Passport.js handling authentication. 

Built by Matt Tarasoff for scalability and ease of use.

### Features
- **Frontend (`frontend/`)**:
  - Dynamic product listings with React
  - Client-side routing via `react-router-dom`
  - Responsive design
- **Backend (`backend/`)**:
  - RESTful API with Express
  - User authentication (signup/login) with Passport.js and bcrypt
  - Product/order management via PostgreSQL
- [Add more, e.g., "Cart persistence"]

## Project Structure
- **`frontend/`**: React-based client
- **`backend/`**: Node.js/Express API
- Root contains this README and LICENSE.

## Prerequisites
- **Node.js**: v16+ (for both)
- **npm**: Included with Node.js
- **PostgreSQL**: v12+ (for backend)

## Frontend Setup (`frontend/`)
### Dependencies
- React 19, `react-router-dom`, `react-scripts`

### Installation
1. **Navigate:** 
```bash cd e-commerce/frontend ```

2. **Install:**
```bash npm install ```

3. **Environment variables:**
- Create `.env` in `frontend/`:
 ``` REACT_APP_API_URL=http://localhost:3001/api ```

4. **Run:**
 ```bash npm start ```
  Access at `http://localhost:3000`.

## Backend Setup (`backend/`)
### Dependencies
- Express, PostgreSQL (`pg`), Passport.js, bcrypt, `dotenv`

### Installation
1. **Navigate:**
 ```bash cd e-commerce/backend ```

2. **Install:**
 ```bash npm install ```

3. **Set up PostgreSQL:**
 - Create a database named `e_commerce`:
  ```bash createdb e_commerce -U e_commerce_user ```
 - [Add schema instructions if you have them, e.g., "Run `schema.sql` to initialize tables."]

4. **Environment variables:**
 - Create `.env` in `backend/` with the following:
  ``` PORT=3001 ```
  ``` DB_HOST=localhost ```
  ``` DB_PORT=5432 ``` 
  ``` DB_USER=e_commerce_user ```
  ``` DB_PASSWORD=[your-password] ```
  ``` DB_NAME=e_commerce ```
  ``` SESSION_SECRET=secret ```
  ``` NODE_ENV=development ```
 - Notes:
  - Replace `[your-password]` with a secure password (or leave blank if not required locally).
  - Update `SESSION_SECRET` to a unique, secure string in production (e.g., `openssl rand -hex 32`).
  - `NODE_ENV` toggles development/production mode.

5. **Run:**
 - Development: `npm run dev` (with `nodemon`)
 - Production: `npm start`
   API runs at `http://localhost:3001`.

## Usage
1. Start the backend: `npm run dev` in `e-commerce/backend/`.
2. Start the frontend: `npm start` in `e-commerce/frontend/`.
3. Visit `http://localhost:3000` to:
 - Browse products 
 - Sign up/login 
 - Add items to cart and checkout

## ContributingContributions welcome! For either part:
1. Fork the repo.
2. Branch (`git checkout -b feature/your-feature`).
3. Commit (`git commit -m "Add feature"`).
4. Push (`git push origin feature/your-feature`).
5. Open a pull request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## LicenseLicensed under the [MIT License](LICENSE).

## Contact
Reach out to Matt Tarasoff at tarasoff.matt@gmail.com or file an issue on GitHub.