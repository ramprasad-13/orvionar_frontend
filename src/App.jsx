// App.jsx (Your main application file)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StatsPage from './components/StatsPage';
import HealthCheck from './components/HealthCheck'; // <-- NEW IMPORT
import Header from './components/Header'; 

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header /> 
        
        <main className="py-8">
            <Routes>
              {/* Main Dashboard - Path: / */}
              <Route path="/" element={<Dashboard />} /> 
              
              {/* Stats Page - Path: /code/:code */}
              <Route path="/code/:code" element={<StatsPage />} />
              
              {/* Health Check Page - Path: /healthz-ui */}
              <Route path="/healthz" element={<HealthCheck />} /> {/* <-- NEW ROUTE */}

              {/* Fallback for 404 */}
              <Route path="*" element={
                <div className="container mx-auto p-8 text-center text-xl">
                    <h2 className="text-3xl font-bold mb-4">404 Not Found</h2>
                    <p className="text-gray-600">The page you are looking for does not exist.</p>
                </div>
              } />
            </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;