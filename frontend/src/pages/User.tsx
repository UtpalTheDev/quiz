import { useReduce } from "../reducer-context/Reducer-context";
import Chart from "react-google-charts";
import  { useEffect, useState } from "react";
import axios from "axios";
import{Grid} from "@material-ui/core"

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function User() {
  const { user } = useReduce();
  const [attendancedata, setattendancedata] = useState<any | null>(null);

  const [monthlyperf,setmonthlyperf]=useState<number>(0);
  const [yearlyperf,setyearlyperf]=useState<number>(0);
  const [dailyperf,setdailyperf]=useState<number>(0);
 
  let item = "2021-05-21";
  let initialdata = [
    [
      { type: "date", id: "Date" },
      { type: "number", id: "Won/Loss" }
    ]
  ];


  useEffect(() => {
    (async function () {
      try {
        let response = await axios.get(
          "https://quiz-backend-demo-2.utpalpati.repl.co/data/attendance"
        );

        if (response.status === 200) {
          response.data.map((item:any, index:any) => {
            item[0] = new Date(item[0]);
            return item;
          });
          setattendancedata([...initialdata, ...response.data]);
        }

        let monthlydata = await axios.get(
          "https://quiz-backend-demo-2.utpalpati.repl.co/data/monthlyperformance"
        );
        if(monthlydata.status===200){
          if(monthlydata.data>0){
            setmonthlyperf(Math.round(monthlydata.data))
          }
          else{
            setmonthlyperf(0)
          }
        }
        let yearlydata = await axios.get(
          "https://quiz-backend-demo-2.utpalpati.repl.co/data/yearlyperformance"
        );
        if(yearlydata.status===200){
          if(yearlydata.data>0){
            setyearlyperf(Math.round(yearlydata.data))
          }
          else{
            setyearlyperf(0)
          }
        }
        let dailydata = await axios.get(
          "https://quiz-backend-demo-2.utpalpati.repl.co/data/dailyperformance"
        );
        if(dailydata.status===200){
          if(dailydata.data>0){
            setdailyperf(Math.round(dailydata.data))
          }
          else{
            setdailyperf(0)
          }
        }

      } catch (error) {
        console.log("attendancerror", error);
        setattendancedata("No Data")
      }
    })();
  }, [user]);

  return (
    <>
    <Grid container justify="center" direction="column" style={{width:"100vw"}} spacing={3}>
      <Grid item><div style={{"paddingLeft":"1rem"}}>Name- {(user.name).toLocaleUpperCase()}</div></Grid>
      
      <Grid item> <div style={{"paddingLeft":"1rem"}}>Email- {user.email}</div></Grid>

      <Grid item style={{textAlign:"center"}}> <div>Activity</div></Grid>

     <Grid item style={{overflowX:"auto",width:"inherit",justifyContent:"center"}}>
     <div style={{textAlign:"center"}}>{!attendancedata && "Loading"}</div>
       <div style={{textAlign:"center"}}>{attendancedata==="No Data" && "No Data"}</div>
      {attendancedata!=="No Data" && attendancedata!==null && (
        <Chart
          width={"950px"}
          height={"200px"}
          style={{margin:"0 auto"}}
          chartType="Calendar"
          loader={<div>Loading Chart</div>}
          data={attendancedata}
          options={{
            title: "Everyday number of quiz attended"
          }}
          rootProps={{ "data-testid": "2" }}
        />
      )}</Grid>
     
      </Grid>
      <Grid container style={{margin:"4rem 0",padding:"0 2rem"}} spacing={0} justify="center">

     <Grid item lg={3} md={4} sm={5} justify="center" style={{margin:"0.5rem 0.7rem",display: "flex",
      alignItems: "center",flexDirection: "column"}}>
     <div style={{width:"70%"}}>
        <CircularProgressbar value={monthlyperf} text={`${monthlyperf}%`} />
      </div> 
        <div style={{textAlign:"center", paddingTop:"0.5rem"}}>Monthly Performance</div>
  
     </Grid>
     <Grid item lg={3} md={4} sm={5} justify="center" style={{margin:"0.5rem 0.7rem",display: "flex",
     alignItems: "center",flexDirection: "column"}}>
     <div style={{width:"70%"}}> 
        <CircularProgressbar value={yearlyperf} text={`${yearlyperf}%`} />
      </div> 
      <div style={{textAlign:"center", paddingTop:"0.5rem"}}>Yearly Performance</div>
 
      </Grid>    
     <Grid item lg={3} md={4} sm={5} justify="center" style={{margin:"0.5rem 0.7rem",display: "flex",
     alignItems: "center",flexDirection: "column"}}>
       <div style={{width:"70%"}}> 
         <CircularProgressbar value={dailyperf} text={`${dailyperf}%`} />
       </div>
       <div style={{textAlign:"center", paddingTop:"0.5rem"}}>Daily Performance</div>
       
      </Grid> 

     </Grid>

    </>
  );
}
