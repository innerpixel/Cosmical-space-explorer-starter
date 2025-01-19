# Space Explorer Developer Guide

## Getting Started

### Prerequisites
1. Node.js (v20.x or later)
2. MongoDB (v7.0 or later)
3. Git
4. A code editor (VS Code recommended)

### Initial Setup

1. **Clone the Repository**
   ```bash
   git clone git@github.com:your-username/Cosmical-space-explorer-starter.git
   cd Cosmical-space-explorer-starter
   ```

2. **Install Dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install
   ```

3. **Set Up MongoDB Locally**
   ```bash
   # Start MongoDB service
   sudo systemctl start mongod
   
   # Create database and user
   mongosh admin --eval '
   db.createUser({
     user: "app_user",
     pwd: "local_password",
     roles: [{ role: "readWrite", db: "space-explorer" }]
   })'
   ```

4. **Configure Environment**
   ```bash
   # In the server directory
   cp .env.example .env
   ```
   
   Edit `.env` with these local development settings:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://app_user:local_password@localhost:27017/space-explorer?authSource=admin
   JWT_SECRET=your-local-secret-key
   JWT_EXPIRES_IN=1d
   FRONTEND_URL=http://localhost:3000
   ```

### Development Workflow

1. **Start Development Server**
   ```bash
   # In the server directory
   npm run dev
   ```
   This will start the server with nodemon for auto-reloading.

2. **Making Changes**
   - Create a new branch for your feature/fix
   ```bash
   git checkout -b feature/your-feature-name
   ```
   - Make your changes
   - Test your changes locally
   - Commit with meaningful messages
   ```bash
   git add .
   git commit -m "feat: add user profile endpoint"
   ```

3. **Testing**
   - Run unit tests:
   ```bash
   npm test
   ```
   - Test API endpoints using Postman or curl:
   ```bash
   # Health check
   curl http://localhost:5000/api/health
   
   # Register a user
   curl -X POST http://localhost:5000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

4. **Code Quality**
   - Run linter:
   ```bash
   npm run lint
   ```
   - Fix common issues:
   ```bash
   npm run lint:fix
   ```

### API Documentation

#### Authentication Endpoints

1. **Sign Up**
   ```
   POST /api/auth/signup
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

2. **Login**
   ```
   POST /api/auth/login
   {
     "email": "user@example.com",
     "password": "password123"
   }
   ```

3. **Profile**
   ```
   GET /api/profile
   Headers: {
     "Authorization": "Bearer YOUR_JWT_TOKEN"
   }
   ```

### Common Development Tasks

1. **Adding a New API Endpoint**
   1. Create controller in `src/controllers/`
   2. Create route in `src/routes/`
   3. Add route to `src/index.js`
   4. Add tests in `__tests__/`

2. **Database Changes**
   1. Create model in `src/models/`
   2. Add validation schemas
   3. Update existing models if needed

3. **Adding Middleware**
   1. Create middleware in `src/middleware/`
   2. Add to routes or globally in `src/index.js`

### Debugging

1. **Server Logs**
   ```bash
   # Watch development logs
   npm run dev
   
   # Check production logs
   tail -f /var/log/space-explorer.log
   ```

2. **Database Queries**
   ```bash
   # Connect to local MongoDB
   mongosh "mongodb://app_user:local_password@localhost:27017/space-explorer?authSource=admin"
   ```

3. **Common Issues**
   - Port already in use: Check running processes
   ```bash
   lsof -i :5000
   ```
   - MongoDB connection issues: Check service status
   ```bash
   systemctl status mongod
   ```

### Best Practices

1. **Code Style**
   - Use ES6+ features
   - Follow airbnb style guide
   - Use async/await for asynchronous operations
   - Add JSDoc comments for functions

2. **Git Workflow**
   - Keep commits small and focused
   - Use conventional commit messages
   - Pull and rebase before pushing
   - Keep branches up to date with main

3. **Security**
   - Never commit sensitive data
   - Always validate user input
   - Use environment variables for secrets
   - Keep dependencies updated

### Getting Help

1. Check the existing documentation in `/docs`
2. Look through closed issues on GitHub
3. Ask team members in the development channel
4. Create a new issue if needed

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

Remember to:
- Add tests for new features
- Update documentation
- Follow the code style guidelines
- Keep commits clean and meaningful
