export interface Comment {
    _id: string;
    author: string;
    text: string;
    createdAt: string;
  }
  
  export interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    organizer: string;
    category: string;
    createdAt: string;
    likes: number;
    comments: Comment[];
    registrations: string[];
  }
  
  export interface EventsData {
    [category: string]: Event[];
  }
  