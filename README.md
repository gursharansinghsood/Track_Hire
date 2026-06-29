# Track Hire

A full-stack application for tracking job applications and managing your hiring journey. Built with Node.js/Express backend and React frontend.

## 📋 Features

- **User Authentication**: Secure login and registration with OTP verification
- **Application Tracking**: Monitor and manage all your job applications
- **Dashboard**: View statistics and insights about your job search
- **User Profile**: Manage your personal information and settings
- **Email Notifications**: Receive OTP and other notifications via email
- **Theme Toggle**: Switch between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database (based on config structure)
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Bcrypt** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **ESLint** - Code linting
- **CSS** - Styling with theme support

## 📁 Project Structure

```
Track Hire/
├── server/           # Backend application
│   ├── src/
│   │   ├── config/   # Configuration files
│   │   ├── controllers/  # Request handlers
│   │   ├── models/   # Database models
│   │   ├── routes/   # API routes
│   │   ├── services/ # Business logic
│   │   ├── middlewares/  # Custom middlewares
│   │   ├── templates/    # Email templates
│   │   └── utils/    # Utility functions
│   ├── package.json
│   ├── server.js
│   └── .env
└── client/           # Frontend application
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/    # Page components
    │   ├── layouts/  # Layout components
    │   ├── services/ # API services
    │   ├── routes/   # Route definitions
    │   └── utils/    # Utility functions
    ├── package.json
    ├── vite.config.js
    └── .env
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- SMTP credentials for email service

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Track\ Hire
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   Create `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   EMAIL_USER=<your-email>
   EMAIL_PASSWORD=<your-email-password>
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```
   Create `.env` file in the client directory:
   ```
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

**Terminal 1 - Backend**
```bash
cd server
npm start
```

**Terminal 2 - Frontend**
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default)

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-otp` - Verify OTP

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Users must:
1. Register with email and password
2. Verify their email with OTP
3. Login to receive JWT token
4. Use token for authenticated requests

## 🎨 Theming

The frontend supports light and dark themes. Toggle using the ThemeToggle component in the navbar.

## 📧 Email Service

OTP and notifications are sent via Nodemailer. Configure your SMTP credentials in the `.env` file.

## 🧪 Testing

```bash
# Run tests (if available)
npm test
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email verifymail2005@gmail.com or open an issue in the repository.

