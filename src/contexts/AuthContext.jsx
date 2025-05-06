import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLogin: false,
    user: null,
    isLoading: true
  });

  // Check auth state on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('https://web.ics.purdue.edu/~omihalic/brightspace-app/check_auth.php', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.authenticated) {
          setAuthState({
            isLogin: true,
            user: data.user,
            isLoading: false
          });
        } else {
          setAuthState({
            isLogin: false,
            user: null,
            isLoading: false
          });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthState({
          isLogin: false,
          user: null,
          isLoading: false
        });
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setAuthState({
      isLogin: true,
      user: userData,
      isLoading: false
    });
  };

  const logout = async () => {
    try {
      await fetch('https://web.ics.purdue.edu/~omihalic/brightspace-app/logout.php', { 
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setAuthState({
      isLogin: false,
      user: null,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}