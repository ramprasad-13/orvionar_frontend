import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Play from './components/Play';
import Footer from './pages/Footer';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Careers from './pages/Careers';

import './App.css';

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

// Updated PlayRoute to simply render Play (same for admin and student)
const PlayRoute = () => {
  return <Play />;
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          {<Navbar />}
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
              <Route path="/careers" element={<Careers/>} />

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
          <Footer/>
        </div>
      </Router>
    </UserProvider>
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