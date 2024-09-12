import React, { createContext, useContext, useReducer,useEffect,FunctionComponent} from "react";
import axios from"axios";
import {Contextstate,actiontype,quizstate } from "../DataTypes/quiz.types";

import { useLogin } from "./Login-context";


const initialstate: quizstate = {
  user: { _id: "", name: "", email: "" },
  score: 0,
  status: "starting",
  currentQsnNo: 1,
  currentquiz: "",
  correct: 0,
  wrong: 0,
  data: {},
  categorydata: []
};

export const Reducercontext = createContext({} as Contextstate);

function quizreducer(state: quizstate, action: actiontype): quizstate {
  switch (action.type) {
    case "LOAD": 
      return{...state, data:action.payload.data}
    
    case "USER":
      return { ...state, user: action.payload };
    case "CURRENTQUIZ":
      return { ...state, currentquiz: action.payload };
    case "RESET":
      return {
        ...state,
        score: 0,
        status: "starting",
        currentQsnNo: 1,
        correct: 0,
        wrong: 0
      };
    case "LOGOUT":
      return{
        ...state,
        user:{_id:"",name:"",email:""},
        score: 0,
        status: "starting",
        currentQsnNo: 1,
        currentquiz: "",
        correct: 0,
        wrong: 0,
        categorydata: Object.keys(state.data)
      }
    case "INCREMENT_SCORE":
      if (
        state.currentQsnNo + 1 <=
        state.data[state.currentquiz].questions.length
      ) {
        return {
          ...state,
          score: state.score + action.payload.score,
          currentQsnNo: state.currentQsnNo + 1,
          status: "Running",
          correct: state.correct + 1
        };
      }
      return {
        ...state,
        score: state.score + action.payload.score,
        currentQsnNo: state.currentQsnNo,
        status: "finished",
        correct: state.correct + 1
      };

    case "DECREMENT_SCORE":
      if (
        state.currentQsnNo + 1 <=
        state.data[state.currentquiz].questions.length
      ) {
        return {
          ...state,
          score: state.score - action.payload.score,
          currentQsnNo: state.currentQsnNo + 1,
          status: "Running",
          wrong: state.wrong + 1
        };
      }
      return {
        ...state,
        score: state.score - action.payload.score,
        currentQsnNo: state.currentQsnNo,
        status: "finished",
        wrong: state.wrong + 1
      };
    case "SKIP":
      if (
        state.currentQsnNo + 1 <=
        state.data[state.currentquiz].questions.length
      )
        return {
          ...state,
          score: state.score,
          currentQsnNo: state.currentQsnNo + 1,
          status: "Running"
        };
      return {
        ...state,
        score: state.score,
        currentQsnNo: state.currentQsnNo,
        status: "finished"
      };
    default:
      return state;
  }
}

export function Contextprovider({ children }:{children:React.ReactChild}) {
  const { token, isUserLogIn,loading,setLoading } = useLogin();

  useEffect(()=>{
    (async()=>{
      try{
        setLoading(true)
        const response=await axios.get("https://quiz-backend-demo-2.utpalpati.repl.co/question/");
        if(response.status===200){
          dispatch({type:"LOAD",payload:{data:response.data}})
        }
        setLoading(false)
      }
      catch(error){
        console.log(error);
        setLoading(false)
      }
     
      
    })()
    
  },[])

  useEffect(()=>{
    (async()=>{
      if(isUserLogIn){
        try{
          const response=await axios.get("https://quiz-backend-demo-2.utpalpati.repl.co/user/userdetails")
          if(response.status===200){
            dispatch({type:"USER",payload:response.data})
          }
        }
        catch(error){
          console.log(error)
        }
      }

    })()
  },[isUserLogIn])


  let [
    {
      user,
      score,
      currentquiz,
      status,
      currentQsnNo,
      correct,
      wrong,
      data,
      categorydata
    },
    dispatch
  ] = useReducer(quizreducer, initialstate);
  return (
    <Reducercontext.Provider
      value={{
        score,
        status,
        currentQsnNo,
        currentquiz,
        user,
        correct,
        wrong,
        data,
        categorydata,
        dispatch
      }}
    >
      {children}
    </Reducercontext.Provider>
  );
}
export function useReduce() {
  return useContext(Reducercontext);
}
