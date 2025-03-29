"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo
} from "react";
import {
  getUserInfo as getStoredUserInfo,
  fetchUserInfo,
  removeToken
} from "@/lib/auth";
import { User, SocialType, Role } from "@/types/user";

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userInfo: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  getToken: () => string | null;
  checkAuthStatus: () => Promise<boolean>;
}

const defaultUser: User = {
  id: 0,
  name: "",
  email: "",
  imageUrl: "",
  socialType: "EMAIL",
  role: "USER",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  userInfo: null,
  token: null,
  login: () => {},
  logout: () => {},
  getToken: () => null,
  checkAuthStatus: async () => false
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userInfo: null as User | null,
    isLoading: true,
    token: null as string | null
  });

  const getToken = useCallback((): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tk-mcp-repo");
    }
    return null;
  }, []);

  const login = useCallback((token: string, user: User) => {
    localStorage.setItem("tk-mcp-repo", token);
    // Store user info in localStorage in the exact format shown in example
    localStorage.setItem(
      "user-info",
      JSON.stringify({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          imageUrl: user.imageUrl,
          socialType: user.socialType,
          role: user.role
          // Intentionally not storing createdAt and updatedAt as they're not in the example
        }
      })
    );
    setAuthState({
      isAuthenticated: true,
      userInfo: user,
      isLoading: false,
      token
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("tk-mcp-repo");
    localStorage.removeItem("user-info");
    setAuthState({
      isAuthenticated: false,
      userInfo: null,
      isLoading: false,
      token: null
    });
  }, []);

  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    try {
      // Check token in local storage
      const storedToken = localStorage.getItem("tk-mcp-repo");
      const storedUserInfo = getStoredUserInfo();

      if (!storedToken) {
        setAuthState({
          isAuthenticated: false,
          userInfo: null,
          isLoading: false,
          token: null
        });
        return false;
      }

      // Validate JWT token
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        const isTokenValid = payload.exp * 1000 > Date.now();

        if (!isTokenValid) {
          localStorage.removeItem("tk-mcp-repo");
          localStorage.removeItem("user-info");
          setAuthState({
            isAuthenticated: false,
            userInfo: null,
            isLoading: false,
            token: null
          });
          return false;
        }
      } catch (tokenError) {
        console.error("Token validation error:", tokenError);
        localStorage.removeItem("tk-mcp-repo");
        localStorage.removeItem("user-info");
        setAuthState({
          isAuthenticated: false,
          userInfo: null,
          isLoading: false,
          token: null
        });
        return false;
      }

      // If we have valid token and stored user info
      if (storedUserInfo && storedUserInfo.data) {
        // Convert stored user info to User type
        const userData: User = {
          id: storedUserInfo.data.id,
          name: storedUserInfo.data.name,
          email: storedUserInfo.data.email,
          imageUrl: storedUserInfo.data.imageUrl,
          socialType: storedUserInfo.data.socialType as SocialType,
          role: storedUserInfo.data.role as Role,
          // Add default values for createdAt and updatedAt if they don't exist in stored data
          createdAt: storedUserInfo.data.createdAt || new Date().toISOString(),
          updatedAt: storedUserInfo.data.updatedAt || new Date().toISOString()
        };

        setAuthState({
          isAuthenticated: true,
          userInfo: userData,
          isLoading: false,
          token: storedToken
        });
        return true;
      }

      // If token is valid but no user info, try to fetch it from API
      const userInfo = await fetchUserInfo();

      if (userInfo && userInfo.data) {
        // Convert API user info to User type
        const userData: User = {
          id: userInfo.data.id,
          name: userInfo.data.name,
          email: userInfo.data.email,
          imageUrl: userInfo.data.imageUrl,
          socialType: userInfo.data.socialType as SocialType,
          role: userInfo.data.role as Role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        setAuthState({
          isAuthenticated: true,
          userInfo: userData,
          isLoading: false,
          token: storedToken
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error checking authentication status:", error);
      removeToken();
      setAuthState({
        isAuthenticated: false,
        userInfo: null,
        isLoading: false,
        token: null
      });
      return false;
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Periodically check auth status (e.g., every minute)
  useEffect(() => {
    const interval = setInterval(checkAuthStatus, 60000);
    return () => clearInterval(interval);
  }, [checkAuthStatus]);

  const value = useMemo(
    () => ({
      isAuthenticated: authState.isAuthenticated,
      isLoading: authState.isLoading,
      userInfo: authState.userInfo,
      token: authState.token,
      login,
      logout,
      getToken,
      checkAuthStatus
    }),
    [authState, login, logout, getToken, checkAuthStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
