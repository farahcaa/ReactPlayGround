import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
interface AuthContextType {
  token: string;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};
interface Response {
  token: string;
}
interface AuthProviderProps {
  children: React.ReactNode;
}
interface AuthContext {
  token: undefined | string | null;
}
const AuthProvidor: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<undefined | null | string>("token");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get<Response>(
          "http://localhost:4999/test"
        );
        console.log(response.data.token);
        setToken(response.data.token);
      } catch {
        setToken(null);
      }
    };
    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization;
      }
      return config;
    });
    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const response = await axios.get<Response>(
              "call refresh token api"
            );
            setToken(response.data.token);
            originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
            originalRequest._retry = true;

            return axios(originalRequest);
          } catch {
            setToken(null);
          }
        }
        return Promise.reject(error);
      }
    );
  });
  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvidor;
