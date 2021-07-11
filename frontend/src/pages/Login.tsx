import { useReduce } from "../reducer-context/Reducer-context";
import { useLogin } from "../reducer-context/Login-context";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {Button,Box,Grid,TextField,CircularProgress} from "@material-ui/core";
import { LocationState } from "../DataTypes/quiz.types";

export function Login() {
  let { isUserLogIn,LoginWithCredentials } = useLogin();
  const [Error,setError]=useState<null|string>(null);//////
  let location = useLocation();
  const state = location.state as LocationState
  let navigate = useNavigate();
  const [Loading,setLoading]= useState(false);
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");



  useEffect(() => {
    if (isUserLogIn) {
      navigate(state?.from ? state.from : "/", { replace: true });
    }
  }, [isUserLogIn]);


  async function LoginHandler() {
    let errorpassed:string = await LoginWithCredentials(email, password);
    setError(errorpassed);
  }

  function emailhandler(event: React.ChangeEvent<HTMLInputElement>) {
    setemail(event.target.value);
  }
  function passwordhandler(event: React.ChangeEvent<HTMLInputElement>) {
    setpassword(event.target.value);
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
        error={Error!==null?true:false}
        value={email}
        type="email"  
        label="Email Id"
         onChange={emailhandler}/>
         </Grid>  
    
        <Grid item>
        <TextField
        error={Error!==null?true:false}
          label="Password"
          value={password}
          type="password"
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
                    LoginHandler()
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
