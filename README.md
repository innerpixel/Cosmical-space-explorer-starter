# Vue 3 PWA Template

A modern Progressive Web App template built with Vue 3, Vite, and TailwindCSS. This template provides a solid foundation for building installable web applications with offline capabilities.

## Features

- PWA Ready: Installable on desktop and mobile devices
- Auto Updates: Automatic updates with user notification
- Offline Support: Works without internet connection
- Modern UI: Built with TailwindCSS
- Testing: Unit and E2E testing setup
- TypeScript: Full TypeScript support
- Performance: Optimized for speed and size

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build:prod

# Preview production build
npm run preview:prod
```

## Project Structure

```
.
├── public/
│   └── icons/              # PWA icons
├── scripts/
│   ├── utils/             
│   │   └── port-manager.sh # Port management utilities
│   ├── dev.sh             # Development server script
│   ├── build.sh           # Production build script
│   ├── preview.sh         # Preview script
│   └── test.sh            # Testing script
├── src/
│   ├── components/
│   │   ├── TopBar.vue     # App header with install button
│   │   └── PWAStatus.vue  # PWA status footer
│   └── App.vue            # Main application component
└── tests/
    ├── unit/              # Unit tests
    └── e2e/               # End-to-end tests
```

## Available Scripts

### Development Scripts

```bash
# Start development server (port 3000)
npm run start

# Build for production
npm run build:prod

# Preview production build
npm run preview:prod
```

### Test Scripts

```bash
# Run unit tests
npm run test:unit

# Run unit tests with coverage
npm run test:unit:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests in interactive mode
npm run test:e2e:open

# Run all tests
npm run test
```

## PWA Features

### Installation

- Install button in the top bar
- Automatic install prompt handling
- Installation status indicator
- Works on both mobile and desktop

### Updates

- Automatic update detection
- User notification when update available
- One-click update installation
- Smooth update process

### Offline Support

- Works without internet connection
- Caches necessary resources
- Indicates online/offline status
- Shows offline readiness status

## Development Features

### Port Management

- Automatic port 3000 management
- Kills existing processes if needed
- Clear error messaging
- Configurable through scripts

### Testing

- Unit testing with Vitest
- E2E testing with Cypress
- Coverage reporting
- Interactive test runner

### Build Process

- Optimized production builds
- Asset optimization
- PWA asset generation
- Build size reporting

## Configuration

### PWA Configuration (vite.config.js)

```javascript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
  manifest: {
    name: 'Vue PWA App',
    short_name: 'Vue PWA',
    description: 'Vue 3 PWA Template',
    theme_color: '#ffffff',
    icons: [
      // Various icon sizes included
    ]
  },
  workbox: {
    // Caching strategies
  }
})
```

### Development Server

- Port: 3000
- Hot Module Replacement enabled
- PWA development mode
- Automatic port management

## PWA Components

### TopBar.vue

- Fixed position header
- Install button
- Installation status
- App branding

### PWAStatus.vue

- Online/offline indicator
- Update notification
- Offline readiness status
- Fixed position footer

## Testing

### Unit Tests

- Component testing
- PWA functionality testing
- Mocked service worker
- Coverage reporting

### E2E Tests

- Installation flow
- Offline functionality
- Update process
- User interactions

## Additional Resources

- [Vue 3 Documentation](https://v3.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
