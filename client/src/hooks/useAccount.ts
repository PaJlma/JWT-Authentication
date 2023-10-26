import axios from "axios";
import jwtDecode from "jwt-decode";

import { useAppSelector } from "@/hooks/redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import accountSlice from "@/store/reducers/account.reducer";

import IAccount from "@/types/account.interface";
import TokenPayload from "@/types/tokenPayload.interface";

export interface UseAccountReturns {
  getAccount: () => IAccount | null;
  registration: (data: RegistrationPayload, options?: RegistrationOptions) => Promise<void>;
  login: (data: LoginPayload, options?: LoginOptions) => Promise<void>;
  logout: (userId: string, options?: LogoutOptions) => Promise<void>;
  autoLogin: () => Promise<void>;
}

type UseAccount = () => UseAccountReturns;

export interface RegistrationPayload {
  nick: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

interface AuthenticationOptions {
  redirect?: boolean;
}

export interface RegistrationOptions extends AuthenticationOptions {}

export interface LoginOptions extends AuthenticationOptions {}

export interface LogoutOptions extends AuthenticationOptions {}

export const useAccount: UseAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useAppSelector(state => state.account);
  
  const getAccount = (): IAccount | null => {
    if (Object.values(account).every(value => value === null)) {
      return null;
    }

    return account as IAccount;
  }

  const registration = async (data: RegistrationPayload, options?: RegistrationOptions): Promise<void> => {
    const response = await axios.post<string>("http://localhost:5000/auth/register", data, { withCredentials: true });

    localStorage.setItem("access", response.data);
    
    const { iat, exp, ...account } = jwtDecode<TokenPayload<IAccount>>(response.data);

    localStorage.setItem("userId", account._id);
    
    dispatch(accountSlice.actions.login(account));
    
    options?.redirect && navigate("/");
  }
  
  const login = async (data: LoginPayload, options?: LoginOptions): Promise<void> => {
    const response = await axios.post<string>("http://localhost:5000/auth/login", data, { withCredentials: true });
    
    localStorage.setItem("access", response.data);
    
    const { iat, exp, ...account } = jwtDecode<TokenPayload<IAccount>>(response.data);

    localStorage.setItem("userId", account._id);

    dispatch(accountSlice.actions.login(account));
    
    options?.redirect && navigate("/");
  }
  
  const logout = async (userId: string, options?: LogoutOptions): Promise<void> => {
    await axios.delete<void>(`http://localhost:5000/auth/logout/${userId}`, { withCredentials: true });
    dispatch(accountSlice.actions.logout());

    localStorage.setItem("access", "");
    localStorage.setItem("userId", "");

    options?.redirect && navigate("/");
  }
  
  const autoLogin = async (): Promise<void> => {
    const userId = localStorage.getItem("userId");
  
    if (userId === "") {
      return;
    }
  
    try {
      const response = await axios.patch<string>(`http://localhost:5000/auth/refresh/${userId}`, null, { withCredentials: true });
    
      const { iat, exp, ...account } = jwtDecode<TokenPayload<IAccount>>(response.data);
  
      dispatch(accountSlice.actions.login(account))
  
      localStorage.setItem("access", response.data);
    } catch {
      dispatch(accountSlice.actions.logout());
      localStorage.setItem("access", "");
      localStorage.setItem("userId", "");
    }

  }

  return { getAccount, registration, login, logout, autoLogin };
}