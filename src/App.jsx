import { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { UserProvider } from './context/UserContext';
import { useUser } from './context/useUser'; // Import useUser from its own file
import { getCoursesByDomainWithoutAuth } from './utils/api';
import './App.css';

const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./pages/Footer'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const RequestResetPassword = lazy(() => import('./pages/RequestResetPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminCourses = lazy(() => import('./pages/AdminCourses'));
const AdminVideos = lazy(() => import('./pages/AdminVideos'));
const StudentDashboard = lazy(() => import('./pages/StudenDashboard'));
const StudentCourses = lazy(() => import('./pages/StudentCourses'));
const StudentVideos = lazy(() => import('./pages/StudentVideos'));
const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Domains = lazy(() => import('./pages/Domains'));
const Course = lazy(() => import('./pages/Course'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminUserAccess = lazy(() => import('./pages/AdminUserAccess'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Careers = lazy(() => import('./pages/Careers'));
const Spinner = lazy(() => import('./components/Spinner')); // Make sure Spinner is imported
const PlayVideo = lazy(() => import('./components/PlayVideo'));

// Query client setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 65,
      retry: 1,
    },
  },
});

// Prefetch courses
const domains = ['cse', 'ece', 'mech', 'civil', 'management', 'pharmacy', 'agriculture', 'others'];
const PrefetchCourses = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const prefetchCourses = async () => {
      try {
        for (const domain of domains) {
          await queryClient.prefetchQuery({
            queryKey: ['courses', domain],
            queryFn: () => getCoursesByDomainWithoutAuth(domain),
          });
        }
      } catch (error) {
        console.error('Error prefetching courses:', error);
      }
    };
    prefetchCourses();
  }, [queryClient]);
  return null;
};

// Route helpers - NOW CHECK isLoadingUser
const DashboardRoute = ({ user, isLoadingUser }) => {
  if (isLoadingUser) return <Spinner />; // Show spinner while loading
  const role = user?.role || 'student';
  return role === 'admin' ? <AdminDashboard /> : <StudentDashboard />;
};
const CoursesRoute = ({ user, isLoadingUser }) => {
  if (isLoadingUser) return <Spinner />; // Show spinner while loading
  const role = user?.role || 'student';
  return role === 'admin' ? <AdminCourses /> : <StudentCourses user={user} />;
};
const VideosRoute = ({ courseId, user, isLoadingUser }) => {
  if (isLoadingUser) return <Spinner />; // Show spinner while loading
  const role = user?.role || 'student';
  return role === 'admin' ? <AdminVideos courseId={courseId} /> : <StudentVideos />;
};

// Scroll-to-top button
const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);
  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 right-4 z-50 bg-orange-600 hover:bg-orange-700 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  ) : null;
};

// WhatsApp floating button
const WhatsAppButton = () => (
  <a
    href="https://wa.me/917483905485"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-4 right-4 z-50 bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center"
    aria-label="Chat on WhatsApp"
  >
    <svg className="w-6 h-6 fill-white" viewBox="0 0 32 32">
      <path d="M16 0c-8.84 0-16 6.88-16 15.36 0 3.2 1.04 6.16 2.8 8.64l-1.84 5.76 5.92-1.92c2.4 1.28 5.12 1.92 8.08 1.92 8.88 0 16-6.88 16-15.36s-7.12-15.36-16-15.36zM16 28.48c-2.56 0-4.96-0.64-7.12-1.84l-0.48-0.32-3.52 1.12 1.12-3.36-0.4-0.56c-1.6-2.24-2.48-4.88-2.48-7.52 0-6.8 5.84-12.32 13.04-12.32s13.04 5.52 13.04 12.32c0 6.8-5.84 12.32-13.04 12.32zM23.04 20.8c-0.4-0.24-2.48-1.44-2.88-1.6-0.4-0.16-0.72-0.24-1.04 0.24-0.32 0.48-1.2 1.6-1.44 1.92-0.24 0.32-0.48 0.32-0.88 0.08-2.4-1.2-3.92-2.08-5.52-4.64-0.4-0.72 0.4-0.72 1.04-2.4 0.08-0.24 0-0.48-0.08-0.72-0.08-0.16-1.04-2.4-1.36-3.28-0.36-0.88-0.72-0.72-1.04-0.72h-0.88c-0.32 0-0.72 0.08-1.04 0.48-0.4 0.48-1.36 1.36-1.36 3.36s1.36 3.92 1.52 4.16c0.16 0.24 2.72 4.24 6.64 5.92 0.92 0.4 1.6 0.64 2.16 0.88 0.88 0.32 1.68 0.24 2.32 0.16 0.72-0.08 2.48-1.04 2.8-2.08 0.32-1.04 0.32-1.92 0.24-2.08-0.08-0.16-0.32-0.24-0.72-0.48z" />
    </svg>
  </a>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Spinner /></div>}>
            <div className="app relative">
              <Navbar />
              <PrefetchCourses />
              <div className="content">
                <Routes>
                  {/* Public Routes */}
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

                  {/* Authenticated Routes (using ProtectedRoute) */}
                  {/* Pass isLoadingUser to context wrappers */}
                  <Route path="/profile" element={<ProtectedRoute><ProfileWithUser /></ProtectedRoute>} />
                  <Route path="/my-library" element={<ProtectedRoute><DashboardWithUser /></ProtectedRoute>} />
                  <Route path="/courses" element={<ProtectedRoute><CoursesWithUser /></ProtectedRoute>} />
                  <Route path="/course/:courseId/videos" element={<ProtectedRoute><VideosWithUser courseId={window.location.pathname.split('/')[2]} /></ProtectedRoute>} />
                  <Route path="/play/:videoId" element={<ProtectedRoute><PlayVideo /></ProtectedRoute>} />
                  <Route path="/admin-user-access" element={<ProtectedRoute><AdminUserAccess /></ProtectedRoute>} />
                </Routes>
              </div>
              <Footer />
              <WhatsAppButton />
              <ScrollToTopButton />
            </div>
          </Suspense>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
};

// Context wrappers - NOW PASS isLoadingUser to their children
const ProfileWithUser = () => {
  const { user, isLoadingUser } = useUser();
  return <Profile user={user} isLoadingUser={isLoadingUser} />; // Pass isLoadingUser
};
const DashboardWithUser = () => {
  const { user, isLoadingUser } = useUser();
  return <DashboardRoute user={user} isLoadingUser={isLoadingUser} />; // Pass isLoadingUser
};
const CoursesWithUser = () => {
  const { user, isLoadingUser } = useUser();
  return <CoursesRoute user={user} isLoadingUser={isLoadingUser} />; // Pass isLoadingUser
};
const VideosWithUser = ({ courseId }) => {
  const { user, isLoadingUser } = useUser();
  return <VideosRoute courseId={courseId} user={user} isLoadingUser={isLoadingUser} />; // Pass isLoadingUser
};

export default App;