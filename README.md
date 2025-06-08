# Complete User Authentication System

A production-ready authentication system built with React, Node.js, MySQL, and MongoDB featuring beautiful UI design and secure authentication.

## 🌟 Features

- **Beautiful, Modern UI**: Glass-morphism design with smooth animations
- **Secure Authentication**: MySQL with prepared statements and bcrypt password hashing
- **Profile Management**: MongoDB for extended user profile data
- **Session Management**: localStorage-based session handling
- **Real-time Validation**: Form validation with instant feedback
- **Responsive Design**: Optimized for all device sizes
- **Production Ready**: Clean code architecture with proper error handling

## 🚀 Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + React Router
- **Backend**: Node.js + Express
- **Databases**: 
  - MySQL (user credentials)
  - MongoDB (profile data)
- **Security**: bcrypt, prepared statements
- **Icons**: Lucide React (SVG-based)

## 📋 Prerequisites

Before running this application, make sure you have installed:

- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install all dependencies
npm install
```

### 2. Database Setup

#### MySQL Setup:
1. Start your MySQL server
2. Create a database (optional - the app will create it automatically):
```sql
CREATE DATABASE auth_system;
```

#### MongoDB Setup:
1. Start your MongoDB server
2. The application will automatically create the database and collections

### 3. Environment Configuration

Update the `.env` file with your database credentials:

```env
# MySQL Configuration
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_username
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=auth_system

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=auth_system_profiles

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 4. Run the Application

```bash
# Start both frontend and backend concurrently
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

### Alternative: Run Separately

```bash
# Terminal 1 - Frontend
npm run dev:client

# Terminal 2 - Backend
npm run dev:server
```

## 📁 Project Structure

```
project-root/
├── src/                          # React frontend
│   ├── components/               # React components
│   │   ├── Login.tsx            # Login page
│   │   ├── Signup.tsx           # Registration page
│   │   ├── Profile.tsx          # Profile management
│   │   └── Navigation.tsx       # Navigation bar
│   ├── contexts/                # React contexts
│   │   └── AuthContext.tsx      # Authentication context
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # App entry point
├── backend/                     # Node.js backend
│   ├── db/                      # Database connections
│   │   ├── mysql.js             # MySQL connection
│   │   └── mongodb.js           # MongoDB connection
│   └── server.js                # Express server
├── .env                         # Environment variables
└── README.md                    # Documentation
```

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **SQL Injection Protection**: MySQL prepared statements
- **Input Validation**: Frontend and backend validation
- **Session Security**: Secure localStorage token management
- **CORS Protection**: Configured for development and production

## 🎨 Design Features

- **Glass-morphism UI**: Modern backdrop blur effects
- **Smooth Animations**: Loading states and transitions
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Professional Color Scheme**: Blue primary with accent colors
- **SVG Icons**: Crisp, scalable Lucide React icons

## 📱 User Flow

1. **Registration**: User signs up with username, email, and password
2. **Login**: User authenticates with credentials
3. **Profile**: User can view and update additional profile information
4. **Session**: Automatic session management with localStorage

## 🔄 API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `GET /api/profile/:userId` - Fetch user profile
- `PUT /api/profile/:userId` - Update user profile

## 🚀 Production Deployment

### Frontend Build:
```bash
npm run build
```

### Environment Variables for Production:
Update `.env` with production database credentials and set:
```env
NODE_ENV=production
```

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Verify MySQL/MongoDB services are running
   - Check credentials in `.env` file
   - Ensure databases exist and are accessible

2. **Port Already in Use**:
   - Change ports in `vite.config.ts` (frontend) or `.env` (backend)
   - Kill existing processes using the ports

3. **CORS Issues**:
   - Ensure backend CORS is configured for your frontend URL
   - Check if both servers are running on correct ports

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please open an issue on GitHub.