import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Define the notification type
interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

interface NotificationSystemProps {
  notifications: Notification[];
  removeNotification: (id: number) => void; // Pass the remove function as a prop
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, removeNotification }) => {
  // Get icon based on notification type
  const getIcon = (type: 'success' | 'warning' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  // Get background color based on type
  const getAlertClassName = (type: 'success' | 'warning' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 w-96">
      {notifications.map(({ id, title, message, type }) => (
        <Alert 
          key={id} 
          className={`relative shadow-lg ${getAlertClassName(type)}`}
        >
          <button
            onClick={() => removeNotification(id)} // Use the passed remove function
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start gap-3">
            {getIcon(type)} {/* Get icon for the notification */}
            <div>
              <AlertTitle className="text-sm font-semibold">
                {title}
              </AlertTitle>
              <AlertDescription className="text-sm">
                {message}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default NotificationSystem;
