import { useReduce } from "./Reducer-context";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chart from "react-google-charts";
import {Box} from "@material-ui/core";
export function Learninggraph() {
  let {  user,currentquiz } = useReduce();
  let [statdata, setstatdata] = useState<any | null>(null);
  const initialdata = [["x", "correct", "wrong"]];
  const { category } = useParams();
  useEffect(() => {
    (async function () {
      console.log("id", user._id);
      try {
        let response = await axios.post(
          "https://quiz-backend-demo-1.utpalpati.repl.co/data/stat",
          {
            userid: user._id,
            category: currentquiz
          }
        );
        if (response.status === 200&&response?.data[0]) {
          setstatdata([...initialdata, ...response.data]);
        }
        return () => {
          setstatdata(null);
        };
      } catch (error) {
        console.log("grapherror", error);
      }
    })();
  }, [user]);
  
  return (
    <>
      <h3>{category} Learning Graph</h3>
      <Box textAlign="center">
      <div>Past 7days data</div>
      {!statdata && "loading"}
      {statdata && (
        <Chart
          style={{ minWidth: "400px", width: "100%", height: "300px" }}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={statdata}
          options={{
            hAxis: {
              title: "Date"
            },
            vAxis: {
              title: "Score"
            },
            series: {
              1: { curveType: "function" }
            }
          }}
          rootProps={{ "data-testid": "2" }}
        />
      )}
      </Box>
    </>
  );
}
