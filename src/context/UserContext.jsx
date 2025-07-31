import { useState, useEffect, useCallback } from 'react';
import { getUserProfile } from '../utils/api';
import { UserContext } from './UserContextObject'; // Import UserContext from its new file

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setIsLoadingUser(true);
        const fetchedUserProfile = await getUserProfile();
        setUser(fetchedUserProfile);
        localStorage.setItem('user', JSON.stringify(fetchedUserProfile)); // Cache verified data
      } catch (error) {
        console.error("Failed to load user profile:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    } else {
      setUser(null);
      localStorage.removeItem('user');
      setIsLoadingUser(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoadingUser, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};