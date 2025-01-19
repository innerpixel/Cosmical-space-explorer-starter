# Cosmical Space Explorer Development Flow

## Development Environment Setup

### Prerequisites
- Node.js (Latest LTS version recommended)
- MongoDB (Latest stable version)
- Git

### Port Configuration
The application uses the following ports:
- Frontend (Vite): 3000
- Backend (Express): 5000
- MongoDB: 27017 (default)

### Environment Files
- `.env.development` - Development environment configuration
- `.env.production` - Production environment configuration (when needed)

## Development Workflow

### 1. Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd cosmical-space-explorer-starter

# Install dependencies
npm install             # Frontend dependencies
cd server && npm install # Backend dependencies
cd ..
```

### 2. Starting Development Environment
```bash
# Start the development environment using the dev script
./dev.sh start
```

The dev script performs the following actions:
1. Checks and starts MongoDB if not running
2. Sets up development database
3. Creates development users
4. Starts the backend server
5. Starts the frontend development server

### 3. Available Development Users
The system automatically creates the following users for development:

| Type        | Email                  | Password      |
|-------------|------------------------|---------------|
| Admin       | admin@cosmical.me      | admin123dev   |
| Developer   | developer@cosmical.me  | dev123local   |
| Contributor | contributor@cosmical.me| contrib123dev |
| Member      | member@cosmical.me     | member123dev  |
| Explorer    | explorer@cosmical.me   | explore123dev |

### 4. Development Commands
```bash
# Start development environment
./dev.sh start

# Reset development database
./dev.sh reset

# Run tests
npm test

# Run e2e tests
npm run test:e2e

# Generate test coverage
npm run test:coverage
```

## Project Structure

```
cosmical-space-explorer/
├── src/                  # Frontend source code
├── server/              # Backend source code
├── public/              # Static assets
├── scripts/             # Development and utility scripts
├── tests/               # Test files
└── dev.sh              # Development environment script
```

## API Endpoints

The backend API is accessible at `http://localhost:5000/api/v1/` with the following main endpoints:

- Authentication
  - POST /auth/login
  - POST /auth/register
  - POST /auth/logout

- User Management
  - GET /users
  - GET /users/:id
  - PUT /users/:id
  - DELETE /users/:id

## Development Guidelines

### Code Style
- Use ESLint for code linting
- Follow Vue.js style guide for frontend code
- Use async/await for asynchronous operations
- Maintain proper error handling

### Git Workflow
1. Create feature branch from main
2. Make changes and commit with descriptive messages
3. Push changes and create pull request
4. Request code review
5. Merge after approval

### Testing
- Write unit tests for new features
- Maintain test coverage
- Run full test suite before pushing

## Troubleshooting

### Common Issues

1. Port Conflicts
   - Check if ports 3000 or 5000 are in use
   - Use `lsof -i :3000` or `lsof -i :5000` to check
   - Kill conflicting processes if needed

2. MongoDB Connection Issues
   - Verify MongoDB is running: `systemctl status mongod`
   - Check MongoDB logs: `journalctl -u mongod`

3. Development Server Issues
   - Clear node_modules and reinstall dependencies
   - Check for conflicting global packages
   - Verify environment variables are set correctly

## Deployment

For deployment instructions, refer to `DEPLOYMENT_FLOW.md`
