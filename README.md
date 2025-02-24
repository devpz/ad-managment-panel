# Advertisement Management Panel

A modern web application for managing advertisements built with React, TypeScript, and Material UI. This project serves as a proof of concept for an advertisement management system with secure access and persistent data storage.

## Technical Stack

- React 18
- TypeScript
- Material UI
- React Router for navigation
- Zod for form validation
- Zustand for state management
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/devpz/ad-manager.git
cd ad-manager
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Usage

### Authentication

- The management panel is protected with a password
- Default password: "recruitment"
- Invalid password attempts redirect to an error page

### Managing Advertisements

1. Access the management panel by entering the correct password
2. View all advertisements on the main panel page
3. Create new advertisements using the "Create New Ad" button
4. Edit existing advertisements by clicking the "Edit" button
5. Delete advertisements using the "Delete" button
6. Load sample data using the "Load Sample Data" button

### Advertisement Rules

- Names must be unique across all advertisements
- Content is limited to 500 characters
- Start date must not be in the past
- End date must be after the start date
