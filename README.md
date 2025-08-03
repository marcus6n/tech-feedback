# Tech Feedback Platform

A modern web application for team feedback management, built with React, Node.js, and Supabase. This platform enables team members to send and receive constructive feedback in a secure and user-friendly environment.

## 🌟 Features

### For Users
- **Send Feedback**: Submit positive or constructive feedback to team members
- **Anonymous Feedback**: Option to send feedback anonymously for honest communication
- **Personal Dashboard**: View all feedback received with statistics and insights
- **User Authentication**: Secure login with Supabase Auth
- **Responsive Design**: Modern UI that works on desktop and mobile devices

### For Administrators
- **Admin Dashboard**: Monitor all feedback across the organization
- **Analytics**: View feedback metrics and trends
- **User Management**: Oversee team feedback activities

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Database & Authentication
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Supabase Auth** - User authentication and authorization
- **PostgreSQL** - Relational database

## 📁 Project Structure

```
tech-feedback/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Supabase configuration
│   │   ├── middleware/     # Authentication middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── index.js        # Server entry point
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context for state management
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   └── utils/          # Utility functions
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/marcus6n/tech-feedback.git
   cd tech-feedback
   ```

2. **Set up Supabase**
   - Create a new project on [Supabase](https://supabase.com)
   - Get your project URL and anon key
   - Create the following table in your Supabase database:

   ```sql
   CREATE TABLE feedbacks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     sender_id UUID REFERENCES auth.users(id),
     receiver_id UUID REFERENCES auth.users(id),
     message TEXT NOT NULL,
     type TEXT NOT NULL CHECK (type IN ('positive', 'constructive')),
     is_anonymous BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your-supabase-api-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-api-role-key
   PORT=3000
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file in the frontend directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_KEY=your_supabase_anon_key
   VITE_API_URL=http://localhost:3000
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📖 Usage Guide

### For Users

1. **Sign Up/Login**: Create an account or log in using Supabase authentication
2. **Share Your ID**: Share your user ID with team members who want to send you feedback
3. **Send Feedback**: Use the "Send Feedback" page to submit feedback to others
4. **View Feedback**: Check your dashboard to see all feedback you've received

### For Administrators

1. **Admin Access**: Users with admin role can access the admin dashboard
2. **Monitor Activity**: View all feedback across the organization
3. **Analytics**: Access feedback metrics and trends

## 🔧 API Endpoints

### Authentication Required
- `POST /api/feedback` - Send feedback
- `GET /api/feedback/my-feedbacks` - Get user's received feedback
- `GET /api/feedback/all-feedbacks` - Get all feedback (admin only)
- `GET /api/feedback/metrics` - Get feedback metrics (admin only)

### Public
- `GET /api/test` - Server health check

## 🎨 Features in Detail

### Feedback Types
- **Positive Feedback**: Recognize good work and achievements
- **Constructive Feedback**: Suggest improvements and areas for growth

### Privacy Options
- **Named Feedback**: Sender's identity is visible to the receiver
- **Anonymous Feedback**: Sender's identity is hidden for honest communication

### User Experience
- **Real-time Validation**: Form validation with helpful error messages
- **Loading States**: Smooth loading indicators during API calls
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Marcus** - [GitHub Profile](https://github.com/marcus6n)

---

Built with ❤️ using React, Node.js, and Supabase
