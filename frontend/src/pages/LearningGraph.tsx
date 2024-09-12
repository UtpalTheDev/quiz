import { useReduce } from "../reducer-context/Reducer-context";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chart from "react-google-charts";
import {Box} from "@material-ui/core";
export function LearningGraph() {
  let {  user,currentquiz } = useReduce();
  let [statdata, setstatdata] = useState<any | null>(null);
  const initialdata = [["x", "correct", "wrong"]];
  const { category } = useParams();
  useEffect(() => {
    (async function () {
      try {
        let response = await axios.post(
          "https://quiz-backend-demo-2.utpalpati.repl.co/data/stat",
          {
            category: category
          }
        );
        console.log(response)
        if (response.status === 200 && response?.data[0]) {
          setstatdata([...initialdata, ...response.data]);
        }
        // else{
        //   setstatdata("No Data")
        // }
        
        return () => {
          setstatdata(null);
        };
      } catch (error) {
        console.log("grapherror", error);
        setstatdata("No Data")
      }
    })();
  }, [user]);
  
  return (
    <>
      <div style={{paddingLeft:"0.5rem"}}><h3>{category} Learning Graph</h3></div>
      <Box textAlign="center">
      <div>Past 7days data</div>
      {statdata===null && "loading"}
      {statdata==="No Data" && statdata}
      {statdata!=="No Data"&& statdata!==null && (
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
