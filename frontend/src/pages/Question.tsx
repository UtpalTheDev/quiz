
import { useReduce } from "../reducer-context/Reducer-context";
import { Statistics,Answer,Qsnblock,Header} from "../components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import {Box} from "@material-ui/core";

export function Question() {
  let { quiztype } = useParams();

  let {
    score,
    status,
    currentQsnNo,
    currentquiz,
    dispatch,
    data,
    user,
    correct,
    wrong
  } = useReduce();

  useEffect(() => {
    dispatch({ type: "CURRENTQUIZ", payload: quiztype });
    dispatch({ type: "RESET" });
  }, []);

  function totalscore() {
    return data[currentquiz].questions.reduce(
      (total, item) => total + item.points,
      0
    );
  }

  useEffect(() => {
    (async function () {
      if (status === "finished") {
        try {
          let response = await axios.post(
            "https://quiz-backend-demo-2.utpalpati.repl.co/data/save",
            {
              userid: user._id,
              quizdata: {
                category: quiztype,
                score,
                correct,
                wrong,
                no_of_question: currentQsnNo,
                totalscore: totalscore(),
                Date: new Date()
              }
            }
          );
        } catch (error) {
          console.log("error", error);
        }
      }
    })();
  }, [status]);
  return (
    <>
      <Box>
        <Header />
        {status !== "finished" && <h4 style={{padding:" 0.3rem 0.3rem",background:"lightblue"}}>Qsn No- {currentQsnNo}</h4>}
        
        <br />

        {status !== "finished" ? (
          <Qsnblock typedata={data[quiztype]} />
        ) : (
          <Statistics />
        )}
       
        {status==="finished" &&<Answer typedata={data[quiztype]}/>}
      </Box>
    </>
  );
}
