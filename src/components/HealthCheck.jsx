import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

const HealthCheck = () => {
    const [status, setStatus] = useState('Checking...');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // Get the base URL (using the environment variable structure defined earlier)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const HEALTHZ_URL = `${BACKEND_URL}/healthz`;

    useEffect(() => {
        const checkHealth = async () => {
            try {
                // We use the full URL here because /healthz is a root backend route, 
                // not an API route handled by the /api proxy base.
                const response = await axios.get(HEALTHZ_URL, { timeout: 5000 }); // 5 second timeout
                
                if (response.status === 200 && response.data.ok === true) {
                    setStatus('✅ Operational');
                    setData(response.data);
                } else {
                    setStatus('⚠️ Degraded');
                    setData(response.data);
                }
            } catch (err) {
                console.error('Health check failed:', err);
                setStatus('❌ Offline / Connection Failed');
                setError(err.message);
                setData(null);
            }
        };

        checkHealth();
    }, []);

    const getColorClass = () => {
        if (status.includes('✅')) return 'border-green-500 text-green-700 bg-green-50';
        if (status.includes('⚠️')) return 'border-yellow-500 text-yellow-700 bg-yellow-50';
        return 'border-red-500 text-red-700 bg-red-50';
    };

    return (
        <div className="container mx-auto p-8 max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">🩺 System Health Check</h2>
            
            <div className={`p-6 border-l-4 rounded-lg shadow-md ${getColorClass()}`}>
                <p className="text-xl font-semibold mb-2">Status: {status}</p>
                <p className="text-sm">Endpoint: <code className="font-mono">{HEALTHZ_URL}</code></p>
            </div>

            {data && (
                <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Response Details:</h3>
                    <p className="text-sm">
                        **OK:** `{data.ok.toString()}`<br />
                        **Version:** `{data.version || 'N/A'}`<br />
                        **Timestamp:** `{new Date().toLocaleString()}`
                    </p>
                </div>
            )}

            {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    <p className="font-semibold">Error Message:</p>
                    <code className="font-mono block mt-1">{error}</code>
                </div>
            )}
            
            <div className="mt-8">
                <RouterLink to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    ← Back to Dashboard
                </RouterLink>
            </div>
        </div>
    );
};

export default HealthCheck;