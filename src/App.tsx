import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './demo/studentDashboard';
import LoginForm from './demo/login-form';
import ChatHistory from './demo/chat-history-component';
import CampusNavigator from './demo/campus-navigator';
import IndoorNavigation from './demo/indoor-navigation-frontend';
import EventManagement from './demo/event-management-frontend';
import SignupPage from './demo/signup-page';
import VerifyOtp from './demo/verify-otp';
import VisitorDashboard from './demo/visitorDashboard';
import OutdoorMap from './components/OutdoorMap';
import LiveMap from './components/livemaps';
import Indoor from './components/indoor';

import ServicesPage from './pages/ServicesPage'; // For Services page
import CanteenPage from './pages/CanteenPage'; // For Canteen page
import HostelPage from './pages/HostelPage'; // For Hostel page
import SwimmingPage from './pages/swimmingPage'; // For Swimming page
import LibraryPage from './pages/LibraryPage'; // For Library page

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup-page" element={<SignupPage />} />
          <Route path="/history" element={<ChatHistory userId='1'/>} />
          <Route path="/campus-nav" element={<CampusNavigator />} />
          <Route path="/indoor-nav" element={<IndoorNavigation />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/visitorDashboard" element={<VisitorDashboard/>} />
          <Route path="/adminDashboard" element={<EventManagement />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/outdoor-navigation" element={<OutdoorMap />} />
          <Route path="/live-map" element={<LiveMap />} />
          <Route path="/indoor" element={<Indoor/>}/>
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/canteen" element={<CanteenPage />} />
          <Route path="/hostel" element={<HostelPage />} />
          <Route path="/swimming" element={<SwimmingPage />} />
          <Route path="/library" element={<LibraryPage />} /> {/* Library with Meditation Center */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;