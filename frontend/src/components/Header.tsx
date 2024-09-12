import { useReduce } from "../reducer-context/Reducer-context";
import {Box,Grid} from "@material-ui/core";

export function Header() {
  let { user, score, status, currentQsnNo, currentquiz, data } = useReduce();
  function totalscore() {
    return data[currentquiz].questions.reduce(
      (total, item) => total + item.points,
      0
    );
  }

  return (
    <Box textAlign="center">
      {data[currentquiz]!==undefined && (
      <>
      <h3>welcome-{user.name}</h3>
    <Grid container justify="space-between" alignItems="center">
      
      
      <div style={{paddingLeft:"0.3rem"}}> 
        Score- ({score}/{totalscore()})
      </div>
      {status !== "finished" && (
        <>
          <div style={{paddingRight:"0.3rem"}}>
            {" "}
            No of Qsn Left- {data[currentquiz].questions.length - currentQsnNo}
          </div>
        </>
      )}
    </Grid>
    <h3>{data[currentquiz].quizName}</h3>
    </>
      )
    }
    </Box>
  );
}
