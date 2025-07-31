// src/context/useUser.js
import { useContext } from 'react';
import { UserContext } from './UserContextObject'; // Import UserContext (now exported)

export const useUser = () => useContext(UserContext);