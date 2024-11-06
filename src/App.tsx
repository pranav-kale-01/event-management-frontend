import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './demo/studentDashboard';
import LoginForm from './demo/login-form';
import ChatHistory from './demo/chat-history-component';
import CampusNavigator from './demo/campus-navigator';
import IndoorNavigation from './demo/indoor-navigation-frontend';
import EventManagement from './demo/event-management-frontend';
import RegisterForm from './demo/register-form';
import VerifyOtp from './demo/verify-otp';
import VisitorDashboard from './demo/visitorDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Define your routes */}
        <Routes>
          <Route path="/register-page" element={<RegisterForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/history" element={<ChatHistory userId='1'/>} />
          <Route path="/campus-nav" element={<CampusNavigator />} />
          <Route path="/indoor-nav" element={<IndoorNavigation />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/visitorDashboard" element={<VisitorDashboard/>} />
          <Route path="/adminDashboard" element={<EventManagement />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;