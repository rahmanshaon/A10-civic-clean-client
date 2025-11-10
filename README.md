## CivicClean - Community Issue Reporting Portal

CivicClean is a full-stack MERN application to empower communities by providing a platform to report, track, and resolve local environmental and cleanliness issues. From reporting overflowing garbage bins to contributing to cleanup funds, this application provides a complete, interactive, and modern user experience.

---

## Live Demo

**Live Website:** https://civic-clean.netlify.app/

---

## Key Features

### Core Functionality

- **Issue Reporting (CRUD):** Authenticated users can create, view (with filtering), update, and delete their own issues.
- **Secure Authentication:** Firebase Email/Password + Google login, with server-side token verification for protected actions.
- **Contribution System:** Users can contribute funds to issues and view their personal contribution history.
- **PDF Receipt Downloads:** Each contribution can be exported as a formatted PDF using jsPDF + jspdf-autotable.

### User Experience

- **Smooth Animations:** Lottie and AOS provide interactive and scroll-based animations.
- **Animated Statistics:** Homepage counters animate on scroll using CountUp + Intersection Observer.
- **Dark/Light Mode:** Theme toggle with preference saved to localStorage.
- **Instant UI Feedback:** Real-time UI updates and confirmations without page reloads.
- **User-Friendly Alerts:** SweetAlert2 for confirmations, React Toastify for notifications.

### Architecture & Security

- **Server-Side Token Validation:** Firebase Admin middleware secures all write operations.
- **Centralized Data Fetching:** Axios interceptors handle authenticated requests; custom hooks manage loading state.
- **Consistent Data Timestamps:** Dates are generated on the server for reliable sorting and activity logs.

---

## Tech Stack

### Frontend

- **React 19** - Component-based UI
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first styling with Vite integration
- **Firebase (Auth)** - Email/Password & Google authentication
- **Axios** - HTTP requests with interceptors
- **React Toastify & SweetAlert2** - Alerts and notifications
- **jsPDF + jsPDF-AutoTable** - PDF receipt generation
- **AOS & Lottie React** - Animations and motion effects
- **Swiper** - Interactive sliders and carousels
- **Date-fns** - Date formatting utilities
- **React CountUp & React Intersection Observer** - Statistic animations and scroll-based triggers
- **React Icons** - Iconography

### Backend

- **Node js** - Server runtime
- **Express js** - RESTful API framework
- **MongoDB / MongoDB Atlas** - Database and cloud storage
- **Firebase Admin SDK** - Secure token verification & authorization
- **CORS** - Cross-origin request handling
- **dotenv** - Environment variable management
