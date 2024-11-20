import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { API_URL } from "../constants";


const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('otp'); // "otp" or "password"
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation(); 

  const {email, userType} = location.state || {};

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/otp/verifyOtp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error('Invalid OTP');
      }

      setStep('password'); // Move to password step on successful OTP verification
    } catch (error: any) {
        console.log(error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, userType }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const responseBody = await response.json();
      
      localStorage.setItem("token", responseBody.userInfo.token);
      localStorage.setItem("user", JSON.stringify(responseBody.userInfo.user));

      // Redirect to appropriate dashboard based on userType
      navigate(userType === 'Student' ? '/studentDashboard' : '/visitorDashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg">
      {step === 'otp' ? (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter the 6-digit OTP sent to {email}</Label>
            <Input
              id="otp"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className={error ? "border-red-500" : ""}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              {/* <AlertCircle className="h-4 w-4" /> */}
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Set your password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={error ? "border-red-500" : ""}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              {/* <AlertCircle className="h-4 w-4" /> */}
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default VerifyOtp;
