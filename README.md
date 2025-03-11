# WhaleByte

A decentralized social platform with token-based interactions built with React Native and Expo.

## Features

- **Token-Based Interactions**: Users can like posts using tokens, creating a real value exchange system
- **User Interaction Tracking**: The app tracks user interactions to provide personalized content recommendations
- **Sphere System**: Users can create and join communities called "Spheres" based on shared interests
- **Secure Authentication**: Includes passphrase generation and validation for wallet security
- **Wallet Management**: Built-in wallet for managing tokens and transactions

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TenmaAsh/WhaleByte.git
cd WhaleByte
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

## Project Structure

- `/src`: Main source code
  - `/contexts`: React Context providers for state management
  - `/screens`: Screen components organized by feature
  - `/navigation`: Navigation configuration
  - `/types`: TypeScript type definitions
  - `/constants`: App constants and configuration

## License

MIT