## CivicClean - Community Issue Reporting Portal

CivicClean is a full-stack MERN application to empower communities by providing a platform to report, track, and resolve local environmental and cleanliness issues. From reporting overflowing garbage bins to contributing to cleanup funds, this application provides a complete, interactive, and modern user experience.

---

## Live Demo

**Live Site:** [Visit CivicClean](https://civic-clean.netlify.app/)

---

## Key Features

### Core Functionality
- **Issue Reporting (CRUD)** - Create, view, update, and delete community issues with filtering options
- **Secure Authentication** - Firebase Email/Password + Google login with server-side token verification
- **Contribution System** - Fund community issues and view personal contribution history
- **PDF Receipt Downloads** - Export contribution receipts as formatted PDFs using jsPDF

### User Experience
- **Dark/Light Mode** - Theme toggle with localStorage persistence
- **Smooth Animations** - Lottie animations and AOS scroll effects
- **Animated Statistics** - Homepage counters with CountUp and Intersection Observer
- **Instant UI Feedback** - Real-time updates without page reloads
- **User-Friendly Alerts** - SweetAlert2 confirmations and React Toastify notifications

### Architecture & Security
- **Server-Side Token Validation** - Firebase Admin middleware secures all write operations
- **Centralized Data Fetching** - Axios interceptors with custom hooks for state management
- **Consistent Timestamps** - Server-generated dates for reliable sorting and activity logs

---

## Technology Stack

### Frontend
- **React 19** - Component-based UI
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling with Vite integration
- **Firebase** - Authentication (Email/Password & Google)
- **Axios** - HTTP client with interceptors
- **jsPDF + jsPDF-AutoTable** - PDF generation
- **Lottie React & AOS** - Animations and motion effects
- **Swiper** - Interactive sliders
- **Date-fns** - Date formatting
- **React CountUp** - Animated statistics
- **React Intersection Observer** - Scroll-based triggers
- **SweetAlert2 & React Toastify** - Alerts and notifications
- **React Icons** - Icon library
- **DaisyUI** - Tailwind component library

### Backend
- **Node.js** - Server runtime
- **Express.js** - RESTful API framework
- **MongoDB / MongoDB Atlas** - Database and cloud storage
- **Firebase Admin SDK** - Token verification and authorization
- **CORS** - Cross-origin request handling
- **dotenv** - Environment variable management

---

## Dependencies

### Production Dependencies
```json
{
  "@tailwindcss/vite": "^4.1.17",
  "aos": "^2.3.4",
  "axios": "^1.13.2",
  "date-fns": "^4.1.0",
  "firebase": "^12.5.0",
  "jspdf": "^3.0.3",
  "jspdf-autotable": "^5.0.2",
  "lottie-react": "^2.4.1",
  "react": "^19.1.1",
  "react-countup": "^6.5.3",
  "react-dom": "^19.1.1",
  "react-icons": "^5.5.0",
  "react-intersection-observer": "^10.0.0",
  "react-router": "^7.9.5",
  "react-toastify": "^11.0.5",
  "sweetalert2": "^11.26.3",
  "swiper": "^12.0.3",
  "tailwindcss": "^4.1.17"
}
```

### Dev Dependencies
```json
{
  "@eslint/js": "^9.36.0",
  "@types/react": "^19.1.16",
  "@types/react-dom": "^19.1.9",
  "@vitejs/plugin-react": "^5.0.4",
  "daisyui": "^5.4.7",
  "eslint": "^9.36.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.22",
  "globals": "^16.4.0",
  "vite": "^7.1.7"
}
```

---

## Running Locally

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)
- Firebase project with authentication enabled

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rahmanshaon/A10-civic-clean-client
   cd A10-civic-clean-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   
   ```env
   VITE_API_KEY=your_firebase_api_key
   VITE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_PROJECT_ID=your_firebase_project_id
   VITE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_APP_ID=your_firebase_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser** at `http://localhost:5173`

---

## Links

- **Live Site:** [CivicClean Live](https://civic-clean.netlify.app/)
- **Frontend Repository:** [GitHub](https://github.com/rahmanshaon/A10-civic-clean-client)
- **Backend Repository:** [GitHub](https://github.com/rahmanshaon/A10-civic-clean-server)
- **Documentation:** [React](https://react.dev/) | [MongoDB](https://www.mongodb.com/) | [Firebase](https://firebase.google.com/docs)