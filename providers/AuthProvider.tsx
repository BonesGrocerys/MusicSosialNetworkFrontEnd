import { View, Text } from "react-native";
import React, {
  FC,
  useState,
  useContext,
  ReactNode,
  createContext,
  useMemo,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import {
  IAuthRequest,
  IAuthResponse,
  IPerson,
  IRegistrationRequest,
} from "../Interfaces/Auth";
import { IOperationResult } from "../Interfaces/OperationResult";
import { API_URL } from "../providers/api";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface IContext {
  user: IPerson | null | undefined;
  isLoading: boolean;
  login: (authRequest: IAuthRequest) => Promise<void>;
  register: (regRequest: IRegistrationRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  clearError: () => void;
  token: string | null | undefined;
}

type Props = { children: ReactNode };

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IPerson | null>();
  const [token, setToken] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const login = async (authRequest: IAuthRequest) => {
    try {
      setIsLoading(true);
      const { data } = await axios
        .post<IOperationResult<IAuthResponse>>(
          `${API_URL}/auth/authenticate`,
          authRequest
        )
        .then((resp) => resp);

      if (data.success) {
        setUser(data?.result?.person);
        clearError();
        await SecureStore.setItemAsync("token", data.result!.token);
      }
    } catch (e: any) {
      setError(e?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    regRequest: IRegistrationRequest
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      const { data } = await axios
        .post<IOperationResult<number>>(
          `${API_URL}/Auth/registration`,
          regRequest
        )
        .then((resp) => resp);

      if (data.success) {
        return true;
      }

      return false;
    } catch (e: any) {
      setError(e?.response?.data?.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);

    await SecureStore.deleteItemAsync("token");
  };

  const getToken = async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync("token").then((token) => token);
    } catch (e: any) {
      return null;
    }
  };

  useEffect(() => {
    getToken().then((jwt) => setToken(jwt));
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      register,
      logout,
      getToken,
      error,
      clearError,
      setError,
      token,
    }),
    [user, isLoading, error, setError, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
