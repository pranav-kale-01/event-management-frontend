export interface EventIds {
    _id: string;
  }
  
  export interface User {
    _id: string;
    email: string;
    password: string;
    userType: string;
    likedEvents: string[];
    registeredEvents: string[];
  }
  