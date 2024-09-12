
import { useLogin } from "../reducer-context/Login-context";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {UserState,Servererror,LocationState } from "../DataTypes/quiz.types";
import {Button,Box,Grid,TextField,CircularProgress} from "@material-ui/core";


export function Signup() {
  const { isUserLogIn,loading,setLoading } = useLogin();
  const [Error,setError]=useState<null | string>(null);
  const location = useLocation();
  const state=location.state as LocationState
  const navigate = useNavigate();
  const [name,setname]=useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");


  useEffect(() => {
    if (isUserLogIn) {
      navigate(state?.from ? state.from : "/", { replace: true });
    }
  }, [isUserLogIn]);

  function emailhandler(event: React.ChangeEvent<HTMLInputElement>) {
    setemail(event.target.value);
  }
  function passwordhandler(event: React.ChangeEvent<HTMLInputElement>) {
    setpassword(event.target.value);
  }
  function namehandler(event: React.ChangeEvent<HTMLInputElement>) {
    setname(event.target.value);
  }


  async function signupHandler() {

    try {
      setLoading(true)
      let response = await axios.post(
        "https://quiz-backend-demo-2.utpalpati.repl.co/signup",
        { user: { name, email, password } }
      );
      if (response.status === 200) {
        setError("");
        navigate("/login");
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message);
    }

  }
  return (
    
      <Box textAlign="center">
        <h1>Signup</h1>
      <form onSubmit={(e)=>{e.preventDefault(); signupHandler();}}>
        <Grid container 
        direction="column"
        style={{marginBottom:"1rem"}}justify="center" alignItems="center" spacing={1}>

        <Grid item>    
        <TextField 
        required
        id="standard-basic" 
        error={Error!==null?true:false}
        value={name}  
        label="Name"
         onChange={namehandler}/>
         <div style={{fontSize:"11px",color:"gray"}}>Name must be 6 characters in length</div>
         </Grid> 

        <Grid item>    
        <TextField 
        required
        id="standard-basic" 
        error={Error!==null?true:false}
        value={email}  
        label="Email Id"
         onChange={emailhandler}/>
         </Grid>  
    
        <Grid item>
        <TextField
        error={Error!==null?true:false}
          required
          id="standard-basic" 
          label="password"
          type="password"
          value={password}
          onChange={passwordhandler}
        />
        <div style={{fontSize:"11px",color:"gray"}}>password must be 6 characters in length</div>
        </Grid>
        <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item>
                <Button
                style={{marginTop:"1rem"}}
                
                size="small"
                color="primary"
                variant="contained"

                >
                  <Link to="/login" className="link">Sign In</Link>
                
                </Button>           
                </Grid>  
                <Grid item>
                <Button
                style={{marginTop:"1rem"}}
                type="submit"
                size="small"
                color="primary"
                variant="contained"
                onClick={() => {
                    
                }}
                >
                Go
                </Button>
                   
                </Grid>   

        
        </Grid>
        </Grid>
        {Error}
        </form>
        {loading&&<CircularProgress/>}
      </Box>
    
  );
}
