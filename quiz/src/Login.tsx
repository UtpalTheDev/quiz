import { useReduce } from "./Reducer-context";
import { useLogin } from "./Login-context";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";


import {Button,Box,Grid,TextField,CircularProgress} from "@material-ui/core";


export function Login() {
  let { dispatch, user } = useReduce();
  let { isUserLogin, setLogin } = useLogin();
  const [Error,setError]=useState(false);
  let {state,pathname} = useLocation();
  let navigate = useNavigate();
  const [Loading,setLoading]= useState(false);
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");

  console.log("navigation",state);
  function navigationcall() {
    if (isUserLogin) {
      navigate(state!==null ? "/" : "/",{replace:true});
    }
  }
  useEffect(() => {
    navigationcall();
    console.log("lnk")
  });

  // navigationcall();
console.log("error",Error);
  function emailhandler(event: React.ChangeEvent<HTMLInputElement>) {
    setemail(event.target.value);
  }
  function passwordhandler(event: React.ChangeEvent<HTMLInputElement>) {
    setpassword(event.target.value);
  }

    
    
  

  type User = {
    _id: string;
    name: string;
    email: string;
  };
  type Servererror = {
    errormessage: string;
  };

  async function verify(): Promise<User | Servererror> {
    try {
      let response = await axios.post(
        "https://quiz-backend-demo-1.utpalpati.repl.co/user/infowithcred",
        { email: email, password: password }
      );
      console.log("verify success",response)
      setError(false);
      return response.data;
    } catch (error) {
      console.log("verify error")

      setError(true);
      if (axios.isAxiosError(error)) {
        let servererror = error as AxiosError<Servererror>;
        if (servererror && servererror.response) {
          return servererror.response.data;
        }
      }
      return { errormessage: "something wrong" };
    }
  }
  async function userassign() {
    setLoading(true);
    if(email!==""&&password!==""){
    let userdata = await verify();
    setLoading(false);
    userdata===null?setError(true):setError(false)
    if (userdata!==null && "name" in userdata) {
      localStorage.setItem(
        "user",
        JSON.stringify({ userid: userdata._id, login: true })
      );
      dispatch({ type: "USER", payload: userdata });
      setLogin((prev) => !prev);
    }
    console.log("login data",userdata);
  }
  }
  return (
    <>
      <Box textAlign="center">
        <h1>login</h1>

        <Grid container 
        direction="column"
        style={{marginBottom:"1rem"}}justify="center" alignItems="center" spacing={1}>
        <Grid item>    
        <TextField 
        id="standard-basic" 
        error={Error}
        value={email}  
        label="Email Id"
         onChange={emailhandler}/>
         </Grid>  
    
        <Grid item>
        <TextField
        error={Error}
          label="Password"
          value={password}
          onChange={passwordhandler}
        /></Grid>
        <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item>
                <Button
                style={{marginTop:"1rem"}}
                
                size="small"
                color="primary"
                variant="contained"

                >
                 <Link to="/signup" className="link">Sign Up</Link>

                
                </Button>           
                </Grid>  
                <Grid item>
                <Button
                style={{marginTop:"1rem"}}
                
                size="small"
                color="primary"
                variant="contained"
                onClick={() => {
                    userassign();
                }}
                >
                Go
                </Button> 
                    
                </Grid>   

        
        </Grid>
        </Grid>

        {Loading&&<CircularProgress/>}

      </Box>
    </>
  );
}
