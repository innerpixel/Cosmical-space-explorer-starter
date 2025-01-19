# Cosmical Space Explorer Development Overview

## Quick Start
```bash
# Start development environment
./dev.sh start
```

## Project Architecture

### Directory Structure
```
cosmical-space-explorer/
├── src/                  # Frontend source code (Vue.js)
├── server/              # Backend source code (Express)
├── public/              # Static assets
├── scripts/             # Development and utility scripts
├── tests/               # Test files
└── dev.sh              # Development environment script
```

## Development Environment

### Prerequisites
- Node.js (Latest LTS version)
- MongoDB (Latest stable version)
- Git

### Port Configuration
- Frontend (Vite): 3000
- Backend (Express): 5000
- MongoDB: 27017

## Live Development & Hot Reload

### Frontend (Vue.js + Vite)
- **Hot Module Replacement (HMR)**: Changes to Vue components, styles, and other frontend assets are automatically reflected in the browser without full page reload
- **Error Overlay**: Compilation errors are shown directly in the browser
- **Source Maps**: Enabled for better debugging experience

### Backend (Express)
- Server uses nodemon for automatic restart on file changes
- API changes require server restart (handled automatically by nodemon)
- Database changes are reflected immediately

### Development Flow
1. Start development environment: `./dev.sh start`
2. Make changes to source files
3. Changes are automatically detected:
   - Frontend changes: Instant reflection in browser (HMR)
   - Backend changes: Automatic server restart
   - Style changes: Instant CSS updates without page reload

## Development Users

| Type        | Email                  | Password      |
|-------------|------------------------|---------------|
| Admin       | admin@cosmical.me      | admin123dev   |
| Developer   | developer@cosmical.me  | dev123local   |
| Contributor | contributor@cosmical.me| contrib123dev |
| Member      | member@cosmical.me     | member123dev  |
| Explorer    | explorer@cosmical.me   | explore123dev |

## Development Commands

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

## API Endpoints

Base URL: `http://localhost:5000/api/v1/`

### Authentication
- POST /auth/login
- POST /auth/register
- POST /auth/logout

### User Management
- GET /users
- GET /users/:id
- PUT /users/:id
- DELETE /users/:id

## Development Guidelines

### Code Style
- ESLint for code linting
- Vue.js style guide for frontend
- Async/await for asynchronous operations
- Proper error handling required

### Git Workflow
1. Create feature branch from main
2. Make changes and commit with descriptive messages
3. Push changes and create pull request
4. Request code review
5. Merge after approval

### Testing Requirements
- Write unit tests for new features
- Maintain test coverage
- Run full test suite before pushing

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Check if ports 3000 or 5000 are in use
   - Use `lsof -i :3000` or `lsof -i :5000` to check
   - Kill conflicting processes if needed

2. **MongoDB Connection Issues**
   - Verify MongoDB is running: `systemctl status mongod`
   - Check MongoDB logs: `journalctl -u mongod`

3. **Development Server Issues**
   - Clear node_modules and reinstall dependencies
   - Check for conflicting global packages
   - Verify environment variables are set correctly

4. **Hot Reload Not Working**
   - Check if file watchers are working (`ps aux | grep watch`)
   - Verify Vite server is running
   - Clear browser cache
   - Restart development server

### When to Restart Development Server
- After installing new npm packages
- When changing environment variables
- If hot reload stops working
- After major git operations (switching branches, etc.)

## Environment Files
- `.env.development` - Development configuration
- `.env.production` - Production configuration
- `.env.example` - Template for environment setup
