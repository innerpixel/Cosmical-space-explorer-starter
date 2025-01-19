# Development vs Production Environment Differences

## Database Configuration
| Aspect | Development | Production |
|--------|-------------|------------|
| Database Port | 27017 (default) | 27019 (SSH tunnel) |
| Database Name | cosmical_dev | space-explorer |
| Connection | Direct local connection | Via SSH tunnel for security |

## Security
| Aspect | Development | Production |
|--------|-------------|------------|
| JWT Secret | Simple dev key | Complex production key (not in config) |
| Passwords | Simple, memorable passwords | Strong, complex passwords |
| Debug Mode | Enabled | Disabled |
| Logging | Verbose (debug level) | Essential only (error/warn) |

## URLs and Endpoints
| Aspect | Development | Production |
|--------|-------------|------------|
| Frontend URL | http://localhost:3000 | https://cosmical.me |
| API URL | http://localhost:5000/api/v1 | /api/v1 (relative to domain) |
| Port Configuration | Explicit ports (3000, 5000) | Production ports handled by reverse proxy |

## Features
| Aspect | Development | Production |
|--------|-------------|------------|
| Auto User Creation | Yes (via dev.sh) | No (manual setup) |
| Hot Reloading | Enabled | Disabled |
| Source Maps | Enabled | Disabled |
| Error Details | Full stack traces | Generic error messages |

## Performance Optimizations
| Aspect | Development | Production |
|--------|-------------|------------|
| Code Minification | No | Yes |
| Asset Compression | No | Yes |
| Caching | Minimal | Aggressive |
| Bundle Optimization | No | Yes |

## Monitoring and Debugging
| Aspect | Development | Production |
|--------|-------------|------------|
| Logging Level | Debug (verbose) | Info/Error (minimal) |
| Performance Monitoring | Basic | Advanced with metrics |
| Error Tracking | Console | Error tracking service |
| Debug Tools | Enabled | Disabled |

## Key Differences Summary

1. **Security**
   - Development uses simple, memorable passwords and keys
   - Production uses complex passwords and secure keys
   - Production has additional security layers (SSH tunneling, HTTPS)

2. **Performance**
   - Development prioritizes developer experience (hot reloading, source maps)
   - Production prioritizes end-user experience (optimization, minification)

3. **Debugging**
   - Development has verbose logging and debugging tools
   - Production has minimal logging for essential information only

4. **Database**
   - Development uses local database with direct connection
   - Production uses SSH tunnel for database connection
   - Different database names to prevent mixing of data

5. **Deployment**
   - Development runs on local ports (3000, 5000)
   - Production runs behind reverse proxy with SSL
   - Production has automated deployment pipeline

## Important Notes

1. **Never use development credentials in production**
2. **Always use HTTPS in production**
3. **Keep production database credentials secure**
4. **Regular backup procedures in production**
5. **Monitoring and alerting in production**
