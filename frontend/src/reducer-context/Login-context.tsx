import React, { useContext, useState, createContext, useEffect,FunctionComponent } from "react";
import axios, { AxiosError } from "axios";
import {UserState, Servererror,Logincontextstate} from "../DataTypes/quiz.types";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom/node_modules/react-router";

const Logincontext = createContext({} as Logincontextstate);

export function Loginprovider({ children }: { children: React.ReactChild }) {
 
  const [isUserLogIn, setLogin] = useState<boolean>(false);
  const [loading,setLoading]=useState<boolean>(false);
  const [token, setToken] = useState<null|String>(null);
  const navigate = useNavigate();


  function setupAuthExceptionHandler(logoutUser:()=>void, navigate:NavigateFunction) {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          logoutUser();
          navigate("login");

        }
        return Promise.reject(error);
      }
    );
  }
  function setupAuthHeaderForServiceCalls(token:null|String) {
    if (token) {
      return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
  }
  useEffect(() => {

    const localgetdata=localStorage?.getItem("login")
    const localParseData =
      localgetdata!==null ?
      JSON.parse(localgetdata) : {};
    if ("token" in localParseData) {
      const {token,isUserLoggedIn}=localParseData
      isUserLoggedIn && token && loginUser({ token });
    }
    
    setupAuthExceptionHandler(logout, navigate);

  }, []);
 
  async function LoginWithCredentials(email:String, password:String) {
    try {
      setLoading(true)
      let response = await axios.post(
        "https://quiz-backend-demo-2.utpalpati.repl.co/login",
        { user: { email, password } }
      );

      if (response.status === 200) {
        loginUser(response.data);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error.response);
      console.log("loginwithcredentials error");
      if(error.response.data?.message){
        return error.response.data.message;
      }
      return error.response.data.error;
    }
  }
  function loginUser({ token }:{token:String}) {
    setToken(token);
    setupAuthHeaderForServiceCalls(token);
    setLogin(true);
    localStorage?.setItem(
      "login",
      JSON.stringify({ isUserLoggedIn: true, token })
    );
  }
  function logout() {
    localStorage?.removeItem("login");
    setLogin(false);
    setToken(null);
    setupAuthHeaderForServiceCalls(null);
  }
  return (
    <>
    <Logincontext.Provider
      value={{ isUserLogIn, setLogin, logout, token, LoginWithCredentials,loading,setLoading }}
    >
      {children}
    </Logincontext.Provider>
    </>
  );
}
export function useLogin() {
  return useContext(Logincontext);
}
