# Ticketing System Frontend

A modern, responsive frontend application for the ticketing system, built with React, React Router, and Bootstrap.

## Features

- **User Interface**
  - Responsive design for all devices
  - Modern and intuitive dashboard
  - Real-time updates and notifications
  - File upload and preview capabilities

- **Authentication**
  - Secure login and registration
  - Role-based access control
  - Protected routes
  - Session management

- **Ticket Management**
  - Create and manage tickets
  - View ticket details and history
  - Add responses and attachments
  - Filter and search functionality

- **Dashboard Views**
  - Role-specific dashboards (Admin, Agent, Customer)
  - Ticket statistics and metrics
  - Recent activity tracking
  - Performance indicators

## Tech Stack

- **Framework**: React.js
- **Routing**: React Router v6
- **State Management**: React Context API
- **UI Components**: React Bootstrap
- **Icons**: React Icons
- **Form Handling**: Formik with Yup validation
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Styling**: CSS3 with Bootstrap

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   │   ├── admin/       # Admin pages
│   │   ├── agent/       # Agent pages
│   │   ├── auth/        # Authentication pages
│   │   └── customer/    # Customer pages
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   └── index.jsx        # Application entry point
```

## Key Components

- **AuthContext**: Manages authentication state
- **Navbar**: Navigation component
- **TicketList**: Displays list of tickets
- **TicketDetail**: Shows ticket details
- **CreateTicket**: Ticket creation form
- **DashboardLayout**: Common dashboard layout
- **StatCard**: Statistics display component

## Pages

### Authentication
- **Login**: User authentication
- **Register**: New user registration

### Customer
- **Dashboard**: Customer overview
- **TicketList**: View all tickets
- **CreateTicket**: Submit new ticket
- **TicketDetail**: View ticket details

### Agent
- **Dashboard**: Agent overview
- **TicketList**: Manage tickets
- **TicketDetail**: Handle ticket responses

### Admin
- **Dashboard**: Admin overview
- **UserManagement**: Manage users
- **GroupManagement**: Manage groups
- **Settings**: System configuration

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Development

- Run in development mode:
  ```bash
  npm start
  ```

- Build for production:
  ```bash
  npm run build
  ```

- Run tests:
  ```bash
  npm test
  ```

## Key Features

- **Responsive Design**
  - Mobile-first approach
  - Bootstrap grid system
  - Flexible layouts

- **User Experience**
  - Intuitive navigation
  - Loading states
  - Error handling
  - Success notifications

- **Security**
  - Protected routes
  - Token-based authentication
  - Input validation
  - Error boundaries

## Recent Updates

- Implemented role-based dashboards
- Added ticket statistics and metrics
- Enhanced file upload functionality
- Improved error handling
- Optimized performance
- Added loading states
- Enhanced user experience

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
