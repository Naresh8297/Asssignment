import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Loginform';
import ForgotPasswordPage from './components/ForgotPassword';
import MultiStepFormPage from './components/MultistepPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/multi-step-form" element={<MultiStepFormPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


