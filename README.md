# TaskManagementBackend

**A simple Node.js + MongoDB project for task management**

## Brief Description

This project follows a RESTful API design using MongoDB and Node.js for managing tasks.

**Install dependencies**

```bash
yarn
```

**Set Up Environment Variables:**
Create a .env file inside server/ and add the following

```bash
DB_URL=mongodb://localhost:27017/taskdb
PORT=8080
JWT_ACCESS_TOKEN_EXPIRY="1D"
```

**Seed Database with Users**

```bash
yarn seed
```

**run backend server**

```bash
yarn dev
```

## API Endpoints

- **POST** `/api/auth/login` → Authenticate user and return JWT token

### Task Management

- **GET** `/api/tasks` → Fetch all tasks
- **POST** `/api/tasks` → Create a new task
- **PUT** `/api/tasks/:id` → Update a task’s status
