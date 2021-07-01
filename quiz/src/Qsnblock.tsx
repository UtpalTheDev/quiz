import { useEffect, useState } from "react";

import { useReduce } from "./Reducer-context";
import { quiz } from "./Data/quiz.types";

import RotateLeft from "@material-ui/icons/RotateLeft"
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { Button, Box, Grid } from "@material-ui/core";

export function Qsnblock({ typedata }: { typedata: quiz }) {
  let { currentQsnNo, dispatch} = useReduce();
  const [time, settime] = useState(15);
  const totaltime=15
  useEffect(() => {
    let timer = setInterval(() => {
      settime((prev) => prev - 1);
    }, 1000);

    if (time === 0) {
      dispatch({ type: "SKIP" });
      settime(15);
    }
    return () => {
      clearInterval(timer);
    };
  }, [dispatch, time]);

  let { question, options, points } = typedata.questions[currentQsnNo - 1];

  return (
    <>
      <Box textAlign="center" style={{width:"100%"}}>
        <div style={{fontSize:"18px"}}>{question}</div>
        <br/>
        <CircularProgressWithLabel value={(time/totaltime)*100} total={totaltime} />
        <h6>Number of point- {points}</h6>
        <Grid container justify="center" >
          {options.map((item, index) => {
            return (
              
                <Grid item xs={10} sm={5} md={4} lg={3} style={{margin:"1rem 0.5rem"}}>
                  <Button
                    variant="outlined"
                    style={{width:"100%",height:"100%",fontSize:"14px"}}
                    color="primary"
                    onClick={() => {
                      if (item.isRight === false) {
                        dispatch({
                          type: "DECREMENT_SCORE",
                          payload: { score: points }
                        });
                        settime(15);
                      } else {
                        dispatch({
                          type: "INCREMENT_SCORE",
                          payload: { score: points }
                        });
                        settime(15);
                      }
                    }}
                  >
                    {` ${item.text}`}
                  </Button>
                </Grid>
              
            );
          })}
        </Grid>
        <br />
        <Grid container spacing={2} style={{width:"100%"}}justify="center">
          <Grid item><Button
          variant="contained"
         
          startIcon={<RotateLeft/>}
          color="secondary"
          onClick={() => {
            dispatch({ type: "RESET" });
            settime(15)
          }}
        >
          reset
        </Button></Grid>
        
        </Grid>
      </Box>
    </>
  );
}
