# PWA Explorer Onboarding

A modern Progressive Web App built with Vue 3, Vite, and PWA capabilities. This project serves as a starter template for building production-ready PWAs with modern web technologies.

## 🚀 Features

- ⚡️ Vue 3 + Vite - Lightning fast development
- 📱 PWA Ready - Works offline and can be installed
- 🎨 Tailwind CSS - Utility-first CSS framework
- 🧪 Testing Suite - Unit tests with Vitest and E2E with Cypress
- 📦 Auto-updates - Seamless app updates with service worker
- 🖼️ Responsive Design - Works on all devices
- 🔍 SEO Friendly - Optimized for search engines
- 📸 Screenshots - Desktop and mobile screenshots included

## 🎯 App Functionality & Data Storage

### Core Features
- Space Object Exploration: Browse and learn about various celestial objects
- Interactive Visualization: Dynamic visualization of space objects and their properties
- Favorites System: Save and manage your favorite space objects
- Search Functionality: Search through the cosmic database
- Educational Content: Detailed information about astronomical phenomena

### Data Management
- **Local Storage**: 
  - User preferences
  - Favorite space objects
  - Recent searches
  - Cached data for offline access
  
- **Vuex Store Structure**:
  - `user/`: User preferences and settings
  - `space/`: Space objects and astronomical data
  - `favorites/`: User's saved items
  - `search/`: Search history and results

### API Integration
- NASA Open APIs integration for space data
- Real-time space news and updates
- Dynamic content updates

### Offline Capabilities
- Cached space object data
- Offline browsing of previously viewed content
- Synchronized updates when back online

## 🛠️ Quick Start

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

```bash
# Clone the repository
git clone https://github.com/innerpixel/pwa-Explorer-onboarding.git

# Navigate to project directory
cd pwa-Explorer-onboarding

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run start

# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e

# Build for production
npm run build:prod

# Preview production build
npm run preview:prod
```

## 📱 PWA Features

- Offline Support
- Install Prompt
- Auto Updates
- Push Notifications (configurable)
- Responsive Design
- App-like Experience
- Customizable Icons
- Splash Screens

## 🧪 Testing

- Unit Tests: Using Vitest for component and utility testing
- E2E Tests: Using Cypress for end-to-end testing
- PWA Tests: Specific tests for PWA functionality

## 📦 Project Structure

```
├── public/              # Static assets
│   ├── icons/          # PWA icons
│   └── screenshots/    # App screenshots
├── src/                # Source code
│   ├── components/    # Vue components
│   ├── assets/        # Dynamic assets
│   └── styles/        # Global styles
├── tests/              # Test files
│   ├── unit/          # Unit tests
│   └── e2e/           # E2E tests
└── scripts/           # Build and utility scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
