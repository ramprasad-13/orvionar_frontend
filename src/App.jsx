import { useEffect } from 'react'; // Add useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { UserProvider, useUser } from './context/UserContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RequestResetPassword from './pages/RequestResetPassword';
import ResetPassword from './pages/ResetPassword';
import AdminDashboard from './pages/AdminDashboard';
import AdminCourses from './pages/AdminCourses';
import AdminVideos from './pages/AdminVideos';
import StudentDashboard from './pages/StudenDashboard';
import StudentCourses from './pages/StudentCourses';
import StudentVideos from './pages/StudentVideos';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';
import Domains from './pages/Domains';
import Course from './pages/Course';
import Profile from './pages/Profile';
import AdminUserAccess from './pages/AdminUserAccess';
import Footer from './pages/Footer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Careers from './pages/Careers';
import { getCoursesByDomainWithoutAuth } from './utils/api'; // Import API function

import './App.css';

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // Cache for 1 hour
      cacheTime: 1000 * 60 * 65, // Keep cache for 65 minutes
      retry: 1, // Retry failed requests once
    },
  },
});

// Define domains to prefetch (same as in Navbar.jsx)
const domains = [
  'cse',
  'ece',
  'mech',
  'civil',
  'management',
  'pharmacy',
  'agriculture',
  'others',
];

// Component to handle prefetching
const PrefetchCourses = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prefetchCourses = async () => {
      try {
        // Prefetch courses for each domain
        for (const domain of domains) {
          await queryClient.prefetchQuery({
            queryKey: ['courses', domain], // Unique key for each domain
            queryFn: () => getCoursesByDomainWithoutAuth(domain),
          });
        }
      } catch (error) {
        console.error('Error prefetching courses:', error);
      }
    };

    prefetchCourses();
  }, [queryClient]);

  return null; // This component doesn't render anything
};

// Define route wrapper components outside App
const DashboardRoute = ({ user }) => {
  const role = user && user.role ? user.role : 'student';
  return role === 'admin' ? <AdminDashboard /> : <StudentDashboard />;
};

const CoursesRoute = ({ user }) => {
  const role = user && user.role ? user.role : 'student';
  return role === 'admin' ? <AdminCourses /> : <StudentCourses user={user} />;
};

const VideosRoute = ({ courseId, user }) => {
  const role = user && user.role ? user.role : 'student';
  return role === 'admin' ? <AdminVideos courseId={courseId} /> : <StudentVideos />;
};

const PlayRoute = () => {
  return <Play />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <div className="app">
            <Navbar />
            <PrefetchCourses /> {/* Add prefetch component */}
            <div className="content">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/request-reset-password" element={<RequestResetPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/domains" element={<Domains />} />
                <Route path="/course/:id" element={<Course />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/careers" element={<Careers />} />

                {/* Protected routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfileWithUser />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-library"
                  element={
                    <ProtectedRoute>
                      <DashboardWithUser />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/courses"
                  element={
                    <ProtectedRoute>
                      <CoursesWithUser />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/course/:courseId/videos"
                  element={
                    <ProtectedRoute>
                      <VideosWithUser courseId={window.location.pathname.split('/')[2]} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/play/:courseId/:videoId"
                  element={
                    <ProtectedRoute>
                      <PlayRoute />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin-user-access"
                  element={
                    <ProtectedRoute>
                      <AdminUserAccess />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
};

// Helper components to access user from context
const ProfileWithUser = () => {
  const { user } = useUser();
  return <Profile user={user} />;
};

const DashboardWithUser = () => {
  const { user } = useUser();
  return <DashboardRoute user={user} />;
};

const CoursesWithUser = () => {
  const { user } = useUser();
  return <CoursesRoute user={user} />;
};

const VideosWithUser = ({ courseId }) => {
  const { user } = useUser();
  return <VideosRoute courseId={courseId} user={user} />;
};

export default App;
