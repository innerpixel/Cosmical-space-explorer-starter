# CSMCL Domain Architecture

## Overview

The CSMCL ecosystem is built on two primary domains, each serving distinct purposes in the decentralized infrastructure.

## Domain Structure

### 1. Cosmical.me (Core Membership Infrastructure)
- **Purpose**: Member authentication and services
- **Components**:
  - Email domain (@cosmical.me)
  - NFT membership verification
  - Flow blockchain authentication
  - Blocto wallet integration
  - Member-to-member communication
  - Access control for decentralized ecosystem

#### Email Configuration
- Mail server: mail.cosmical.me
- SPF, DKIM, and PTR records configured
- Exclusive @cosmical.me addresses for members
- Used for secure member communication

### 2. CSMCL.space (Public Platform)
- **Purpose**: Public-facing space exploration platform
- **Components**:
  - Space exploration interface
  - Flow Network integration
  - NFT marketplace/exchange
  - Member showcase space
  - Community features
  - Public engagement tools

## Authentication Flow

```mermaid
graph TD
    A[User] -->|Gets NFT| B[CSMCL Membership]
    B -->|Receives| C[@cosmical.me email]
    C -->|Authenticates with| D[Flow Network]
    C -->|Integrates with| E[Blocto Wallet]
    D -->|Accesses| F[csmcl.space]
    E -->|Interacts with| F
```

## Membership Benefits
1. Exclusive @cosmical.me email address
2. Verified member status on csmcl.space
3. Access to member-only features
4. Secure blockchain authentication
5. Part of decentralized ecosystem

## Security Considerations
1. Email domain separation for enhanced security
2. Multi-factor authentication via email and blockchain
3. Clear separation between member and public services
4. Verifiable membership through email domain
5. Secure member-to-member communication

## Technical Implementation
- Email server: Postfix + Dovecot
- Authentication: Flow Network + Email verification
- DNS Configuration: Separate records for each domain
- Security: SPF, DKIM, DMARC for email
- Integration: Flow blockchain + Blocto wallet

## Future Considerations
1. Additional email security features
2. Enhanced blockchain integration
3. Cross-platform authentication improvements
4. Expanded member services
5. Advanced NFT-email integration
