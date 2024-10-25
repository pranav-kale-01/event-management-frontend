// App.tsx or App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotificationSystem from './demo/notification-system';
import LoginForm from './demo/login-form';
import ChatHistory from './demo/chat-history-component';
import CampusNavigator from './demo/campus-navigator';
import IndoorNavigation from './demo/indoor-navigation-frontend';
import EventManagement from './demo/event-management-frontend';
import RegisterForm from './demo/register-form';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/history" element={<ChatHistory userId='1'/>} />
          <Route path="/campus-nav" element={<CampusNavigator />} />
          <Route path="/indoor-nav" element={<IndoorNavigation />} />
          <Route path="/event" element={<EventManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;